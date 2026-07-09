import asyncio 
import socket
from flask import Flask 
from matplotlib.pyplot import plt
import numpy as np
import logging

app = Flask(__name__)

@app.route("/")

class UnoVisualDashBoard:
    def __init__(self):
        self.arr = np.array([10, 20, 40, 60, 80, 100])
        pass

def main():
    
    async def estbalish_connection():
        network_loop = asyncio.get_running_loop()
        print(f"Run this loop: {network_loop}")
        client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        target_port = 5173
        target_host = "http://localhost:5173"
        
        #TODO: setting the client connection to non-blocking mode
        client_socket.setblocking(False)
        await asyncio.sleep(1)

        try:
            await network_loop.socket_connect(client_socket(target_port, target_host))
        
        except Exception as e:
            print(f"Connection could not be established: {e}")
            client_socket.close()
            return
        await asyncio.sleep(1)

class Logging:
    def __init__(self):
        self.logger = logging.getLogger("Logs")
        self.logger.setLevel(logging.ERROR)

        if self.logger.handlers:
            file_handler = logging.FileHandler("Error.Logs")
            self.logger.addHandler(file_handler)

        self.logger.error("Error Occurred: ")

if __name__ == "__main__":
    main()
    app.run(debug=False)