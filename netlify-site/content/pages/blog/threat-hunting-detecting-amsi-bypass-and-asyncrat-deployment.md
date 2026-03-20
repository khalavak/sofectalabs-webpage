---
type: PostLayout
title: "Detecting AMSI Bypass"
date: "2024-04-07"
category: "THREAT HUNTING"
excerpt: "Technical deep dive into fileless attack chains and in-memory evasion tactics."
slug: "threat-hunting-detecting-amsi-bypass-and-asyncrat-deployment"
featuredImage:
  type: ImageBlock
  url: "/assets/logo-horizontal.png"
  altText: "Detecting AMSI Bypass"
---

            
            
            <p>
                At SofectaLabs, we utilize AI, automation, and human creativity to find hidden detection gaps. Recent campaigns leverage AsyncRAT using AMSI (Antimalware Scan Interface) bypass techniques to evade detection. By operating entirely in memory and suppressing system monitoring, these campaigns achieve stealth with little to no antivirus detection.
            </p>

            <h3>Fileless Attack Chains</h3>
            <p>
                Attackers use obfuscated PowerShell scripts to load payloads into memory. A notable technique involves the Null-AMSI tool, which disables both AMSI and ETW (Event Tracing for Windows).
            </p>

            <h3>Hypothesis-Driven Threat Hunting</h3>
            <p>
                Adversaries may attempt to bypass AMSI by injecting a null parameter like <code>amsiInitFailed</code>. We map these behaviors to MITRE ATT&CK to understand telemetry points and artifacts.
            </p>

            <blockquote>
                "Hypothesis-driven threat hunting has become essential to uncover APTs that bypass traditional security controls."
            </blockquote>

            <h3>Detecting Stealthy Activity</h3>
            <ul>
                <li><strong>PowerShell Operational Logs (Event ID 4103/4104):</strong> Capturing reflective access to AmsiUtils or raw memory operations like VirtualProtect.</li>
                <li><strong>Process Creation Events (Event ID 4688):</strong> Looking for executions with <code>-ExecutionPolicy Bypass</code> or <code>Invoke-WebRequest</code>.</li>
                <li><strong>Memory Modification:</strong> Sysmon Event ID 10 can indicate in-process patching of <code>amsi.dll</code>.</li>
                <li><strong>C2 Communication:</strong> Identifying beacons to TryCloudflare tunnels or known dynamic DNS domains.</li>
            </ul>

            <h3>Operationalizing Insights</h3>
            <p>
                While AMSI bypass is designed to avoid detection, it inevitably leaves subtle breadcrumbs. By correlating these traces—from script execution to encrypted C2 communication—defenders can reconstruct the full picture of malicious activity.
            </p>
        