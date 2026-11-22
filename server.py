#!/usr/bin/env python3
"""
Vaidya Veda - Local Development Server
Dr. Nageshree (Ayurvedic Fertility Specialist)
"""

import http.server
import socketserver
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for local testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), CustomHTTPHandler) as httpd:
        print(f"=====================================================")
        print(f"  🌿 Vaidya Veda | Dr. Nageshree (BAMS)")
        print(f"  Ayurvedic Fertility & Conception Platform")
        print(f"=====================================================")
        print(f"  • Patient Website : http://localhost:{PORT}")
        print(f"  • Doctor Admin Desk: http://localhost:{PORT}/admin.html")
        print(f"  • Doctor PIN      : 1234")
        print(f"=====================================================")
        print(f"  Serving files from: {DIRECTORY}")
        print(f"  Press Ctrl+C to stop the server.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully.")
            httpd.shutdown()

if __name__ == "__main__":
    run_server()
