import multiprocessing
import threading
import eel

from main import runSA

simulated_annealing_process=None
message_queue_process=None
message_queue=None

def progress_callback(queue_msg):
    #queue.put((i,1, best_state, current_state,current_temp))
    current_state=queue_msg[3]
    best_state=queue_msg[2]
    eel.progress({'i': queue_msg[0],'status': queue_msg[1], 'current_temp':queue_msg[4], "current_state":current_state.bag.json(), "best_state":best_state.bag.json()})

def queue_manager(queue: multiprocessing.Queue):
    while(True):
        msg=None
        if queue.qsize() > 0:
            msg=queue.get()
        if msg: 
            progress_callback(msg)
            if msg[1] == -1: 
                break
        eel.sleep(.001)


@eel.expose
def start(user_config):
    global simulated_annealing_process
    global message_queue
    global message_queue_process
    global terminate_event
    message_queue=multiprocessing.Queue()
    terminate_event = threading.Event()
    simulated_annealing_process = threading.Thread(target=runSA, args=(user_config, message_queue, terminate_event))
    simulated_annealing_process.start()
    message_queue_process = eel.spawn(queue_manager,message_queue)
    print("Searching started")
    

@eel.expose
def stop():
    global simulated_annealing_process
    global message_queue_process
    if terminate_event:
        terminate_event.set()
        if simulated_annealing_process:
            simulated_annealing_process.join()
    if message_queue_process:
        message_queue_process.kill()
    if message_queue:
        message_queue.close()
    print("Searching Stopped")
    
    

eel.init('gui')
if __name__ == '__main__':
    #eel.start('index.html', port=0, cmdline_args=['--start-fullscreen', '--browser-startup-dialog'])
    eel.start('index.html', mode='chrome-app', cmdline_args=['--start-fullscreen'])
