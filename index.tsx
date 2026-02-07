import { GoogleGenAI } from "@google/genai";

// --- Data Configuration ---
const MEMORY_GALLERY = [
    { url: "together.jpeg", label: "profile_snapshot.bak" },
    { url: "first deploy.jpeg", label: "first_deploy_event.jpg" },
    { url: "laugh.jpeg", label: "laughter_buffer_v1.png" },
    { url: "always there for each other.jpeg", label: "memories_endpoint.webp " },
    { url: "perfect pic.jpeg", label: "shared_infra_node.jpg" },
    { url: "meamories.jpeg", label: "bestfriend_ha_node.png" }
];

const VALENTINE_PIPELINE = [
    { id: "S1", name: "Rose Protocol", date: "Feb 07", icon: "🌹", status: "success" },
    { id: "S2", name: "Propose Service", date: "Feb 08", icon: "💍", status: "success" },
    { id: "S3", name: "Cacao Cache", date: "Feb 09", icon: "🍫", status: "success" },
    { id: "S4", name: "Teddy Thread", date: "Feb 10", icon: "🧸", status: "running" },
    { id: "S5", name: "Promise Instance", date: "Feb 11", icon: "🤝", status: "pending" },
    { id: "S6", name: "MASTER_MERGE", date: "Feb 14", icon: "❤️", status: "pending" }
];

const ROMANTIC_THOUGHTS = [
    "Our love is like a distributed system: even when we are apart, our state remains perfectly synchronized.",
    "You are the root user of my heart, with full administrative privileges forever.",
    "In a world of constant changes, you are my immutable infrastructure—steady, reliable, and beautiful.",
    "Our bond has 99.999% availability; I am always here for you, no matter the load.",
    "Every memory we deploy is a successful commit to our shared history."
];

// --- Server Visuals Engine ---
class SyncEngine {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    packets: any[] = [];
    startTime: number = Date.now();

    constructor(id: string) {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
        this.startLeds();
    }

    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    startLeds() {
        const racks = ['her', 'him'];
        racks.forEach(r => {
            const container = document.getElementById(`leds-${r}`);
            if (container) {
                container.innerHTML = ''; // Clear existing
                for (let i = 0; i < 24; i++) {
                    const led = document.createElement('div');
                    led.className = `led ${r === 'her' ? 'active-a' : 'active-b'}`;
                    led.style.animationDelay = `${Math.random() * 2}s`;
                    led.style.opacity = (Math.random() * 0.5 + 0.5).toString();
                    container.appendChild(led);
                }
            }
        });
    }

    addPacket(color: string) {
        this.packets.push({
            x: 0,
            y: this.canvas.height / 2 + (Math.random() - 0.5) * 50,
            speed: 2 + Math.random() * 3,
            color: color,
            size: 2 + Math.random() * 4
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Background pulses
        const pulse = Math.sin(Date.now() * 0.002) * 0.1 + 0.1;
        this.ctx.strokeStyle = `rgba(0, 242, 255, ${pulse})`;
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 15]);
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.stroke();
        this.ctx.setLineDash([]);

        // Packets
        if (Math.random() < 0.1) this.addPacket('#00f2ff');
        if (Math.random() < 0.1) this.addPacket('#ff007f');

        this.packets = this.packets.filter(p => p.x < this.canvas.width);
        this.packets.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            p.x += p.speed;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// --- App Core Logic ---
function init() {
    new SyncEngine('sync-canvas');
    renderGallery();
    renderPipeline();
    renderRomanticThoughts();
    updateUptime();
    handleCLI();
    
    document.getElementById('force-sync')?.addEventListener('click', () => {
        const output = document.getElementById('cli-output');
        if (output) {
            output.innerHTML += `<br><span style="color: #ffbd2e;">[WARN] Triggering full system state re-synchronization...</span>`;
            setTimeout(() => {
                output.innerHTML += `<br><span style="color: #3fb950;">[SUCCESS] Cache flushed. Emotions re-indexed. 99.999% Reliability confirmed.</span>`;
                output.scrollTop = output.scrollHeight;
            }, 1000);
        }
    });
}

function renderGallery() {
    const container = document.getElementById('photo-gallery');
    if (!container) return;
    container.innerHTML = MEMORY_GALLERY.map(img => `
        <div class="object-asset">
            <img src="${img.url}" alt="Memory" onerror="this.src='https://images.unsplash.com/photo-1516589174184-c685ca6d1487?w=600'">
            <div class="monospace" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.85); padding: 8px; font-size: 0.65rem; color: #00f2ff; z-index: 10;">
                ${img.label}
            </div>
        </div>
    `).join('');
}

function renderPipeline() {
    const container = document.getElementById('pipeline-container');
    if (!container) return;
    container.innerHTML = VALENTINE_PIPELINE.map(step => `
        <div class="pipeline-step ${step.status}">
            <span class="step-tag monospace">${step.date} - ${step.status.toUpperCase()}</span>
            <div class="monospace" style="font-size: 0.85rem; display: flex; align-items: center; gap: 8px;">
                ${step.icon} ${step.name}
            </div>
        </div>
    `).join('');
}

function renderRomanticThoughts() {
    const container = document.getElementById('romantic-thoughts');
    if (!container) return;
    container.innerHTML = ROMANTIC_THOUGHTS.map(thought => `
        <div class="thought-item monospace">
            <span style="color: var(--server-b); margin-right: 8px;">[LOG]</span> ${thought}
        </div>
    `).join('');
}

function updateUptime() {
    const el = document.getElementById('uptime-val');
    const relationshipStart = new Date('2023-01-01T00:00:00'); // Sample start date
    
    setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - relationshipStart.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / 1000 / 60) % 60);
        const secs = Math.floor((diff / 1000) % 60);
        if (el) el.innerText = `${days.toString().padStart(3, '0')}:${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

function handleCLI() {
    const input = document.getElementById('cli-input') as HTMLInputElement;
    const output = document.getElementById('cli-output');

    input?.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const val = input.value.trim();
            if (!val) return;

            input.value = '';
            if (output) {
                output.innerHTML += `<br><span style="color: #00f2ff;">> Deploying memory packet:</span> "${val}"`;
                output.scrollTop = output.scrollHeight;
            }

            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const result = await ai.models.generateContent({
                    model: 'gemini-3-flash-preview',
                    contents: `You are a LoveOps System Architect. A Cloud Application Engineer (Her) is sending a message/memory to her Boyfriend (Him).
                    Memory/Message: "${val}"
                    Write a "Root Cause Analysis (RCA)" or "System Audit Report" explaining why this proves their connection is an infinitely scalable, high-availability distributed system.
                    Use engineering jargon like: latency, packet loss, load balancing, multi-region failover, cluster integrity.
                    Be professional yet romantic. Max 100 words. Format with tags like [INFO], [SUCCESS], and [CONCLUSION].`,
                    config: { temperature: 0.9 }
                });

                if (output && result.text) {
                    output.innerHTML += `<br><br><span style="color: #ff007f;">[AUDIT_REPORT_INCOMING]</span><br>${result.text.replace(/\n/g, '<br>')}<br>`;
                    output.scrollTop = output.scrollHeight;
                }
            } catch (err) {
                if (output) output.innerHTML += `<br><span style="color: #ff5f56;">[ERROR] Encryption mismatch. Result: Love too high for existing buffer.</span>`;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', init);