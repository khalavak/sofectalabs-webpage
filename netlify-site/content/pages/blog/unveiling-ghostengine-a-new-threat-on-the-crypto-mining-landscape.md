---
type: PostLayout
title: "Unveiling GHOSTENGINE"
date: "2024-05-26"
category: "MDR"
excerpt: "How stealthy miners use BYOVD to disable EDR tools and carry out operations undetected."
slug: "unveiling-ghostengine-a-new-threat-on-the-crypto-mining-landscape"
featuredImage:
  type: ImageBlock
  url: "/assets/blog-ghostengine.png"
  altText: "Unveiling GHOSTENGINE"
---

            
            
            <p>
                In an ever-evolving cybersecurity landscape, GHOSTENGINE emerges as a new player, employing both cunning and aggressive methods. This intrusion set utilizes multiple malicious modules and exploits vulnerable drivers to disable known security solutions, like Endpoint Detection and Response (EDR) tools, facilitating its crypto mining operations.
            </p>

            <h3>The Infection Flow</h3>
            <p>
                GHOSTENGINE's sophisticated operation begins with an innocuous PowerShell script. It proceeds to elevate its privileges, gaining unrestricted access to the system. Upon gaining control, it deploys known vulnerable drivers to disable installed EDR solutions, making it harder for security teams to detect its presence.
            </p>
            <p>
                The Elastic Security Labs team has meticulously dissected GHOSTENGINE’s operations, from its initial infection and establishment of persistence to the installation of a previously undocumented backdoor and execution of a crypto-miner (like <code>Tiworker.exe</code>).
            </p>

            <h3>Elastic Endpoints: Tamper-Proof Protection</h3>
            <p>
                Our Elastic XDR solution provides an <a href="https://www.elastic.co/guide/en/security/current/agent-tamper-protection.html">"agent tamper protection"</a> mechanism. This ensures that EDR solutions are not tampered with, disabled, or uninstalled without notification. This is crucial as GHOSTENGINE specifically targets the availability of defensive tools.
            </p>

            <h3>Hunting for GHOSTENGINE</h3>
            <p>
                Using Elasticsearch advanced query languages (ES|QL), our MDR team can effectively hunt for bad indicators across customer environments in minutes.
            </p>

            <h4>ES|QL Query:</h4>
            <pre><code>FROM *:logs-* 
| WHERE process.hash.sha256 IN ( 
    "2fe78941d74d35f721556697491a438bf3573094d7ac091b42e4f59ecbd25753", 
    "4b5229b3250c8c08b98cb710d6c056144271de099a57ae09f5d2097fc41bd4f1", 
    "2b33df9aff7cb99a782b252e8eb65ca49874a112986a1c49cd9971210597a8ae" 
) OR dns.question.name IN ("download.yrnvtklot.com", "ftp.yrnvtklot.com")
| LIMIT 10</code></pre>

            <h3>Conclusion</h3>
            <p>
                While GHOSTENGINE’s operations may seem daunting, Sofecta Labs’ MDR services and Elastic Endpoints’ tamper-proof mechanism provide critical defense. We stay committed to providing the best tools and support to protect your systems as threat actors continue to evolve.
            </p>
        