# from allennlp.predictors.predictor import Predictor
# import allennlp_models.tagging
from pptree import *
from contextlib import redirect_stdout

event_stack = []
node_ldict = {}
already_explored_events = []
already_explored_states = []
story = '''(1) Jack thought his new trench coat was very sleek.
(2) He wore it no matter the season.
(3) One day he noticed a small tear in the back.
(4) Spiders were crawling out of the breach.
(5) Jack doesn't wear his trench coat any more.'''

tree_tracker_handle = 'tree_tracker.txt'
tree_tracker = open(tree_tracker_handle,'w')

# ===================================================================
# Return the last action that is performed by an entity in the story
# ===================================================================
def init_event_stack():
    print(f'----STORY----\n{story}')
    print(f'\n-----------------------------------------------------------------')
    print(f'LAST ACTION PERFORMED BY AN ENTITY')
    print('-----------------------------------------------------------------')

    last_event_trigger = input("\n>>> Last action performed by a participant in the story :: ")
    last_event_loc = input(">>> Select the sentence where this event is mentioned (1 or 2 or ... or 5) :: ")

    return f"<EV: {last_event_trigger}-[{last_event_loc}]>"


# ===================================================================
# Get the list of precondition events for the input event
# ===================================================================
def get_precondition_event( event: str):
    pre_cond_events = []
    print(f'\n----STORY----\n{story}')
    print(f'\n-----------------------------------------------------------------')
    print(f"PRECONDITION EVENT (??) >>===>> {event}")
    print('-----------------------------------------------------------------')

    event_trigger = input(f"\n>>> Event that DIRECTLY caused/enabled {event} ('none' to STOP):: ")
    event_loc = input(">> Sentence where this event is mentioned ('none' to STOP):: ")

    if (event_loc == "none"):
        return []
    
    # Get all the pre-condition events for the "event"
    while (event_loc != "none"):
        
        pre_cond_events.append(f"<EV: {event_trigger}-[{event_loc}]>")

        event_trigger = input(f"\n>>> Event that DIRECTLY caused/enabled {event} ('none' to STOP):: ")
        event_loc = input(">> Sentence where this event is mentioned ('none' to STOP):: ")

    return pre_cond_events


# ===================================================================
# Get additional precondition state
# ===================================================================
def get_addn_precondition_state( event: str):
    pre_cond_states = []

    print(f'\n----STORY----\n{story}')
    print(f'\n-----------------------------------------------------------------')
    print(f"Additional Precondition STATES in STORY (??) >>===>> {event}")
    print('-----------------------------------------------------------------')
    additional_state = input(f"\n<< QUESTION >> Apart from the events already selected for {event}, are there any states DIRECTLY in the story that causes / enables this event ?? (y/n) ::")

    # Get all the pre-condition events for the "event"
    while additional_state == "y":

        state_trigger = input(f"\n>>> What participant state directly in the story directly that causes or enables {event}:: ")
        state_loc = input(">>> Select the sentences where the state is mentioned (1 or 2 or ... or 5):: ")

        pre_cond_states.append(f"<ST: {state_trigger}:[{state_loc}]>")
    
        additional_state = input(f"\n>>> More such states in the story that causes or enables {event} ?? (y/n)")

    return pre_cond_states


# ===================================================================
# Get the connecting information between a focus event and it's precondition event
# ===================================================================
def get_connecting_state( focus_event: str, pre_cond_event: str):
    connecting_state = []

    print(f'\n----STORY----\n{story}')
    print(f'\n-----------------------------------------------------------------')
    print(f"{pre_cond_event} >>====>> CONNECTING STATE (??) >>====>> {focus_event}")
    print('-----------------------------------------------------------------')
    print(f"\n<< QUESTION >> What participant state (connecting state) as a result of {pre_cond_event} causes or enables {focus_event}?")

    state_trigger = input(f"\n>>> What participant state (connecting state) as a result of {pre_cond_event} causes or enables {focus_event}?:: ")
    state_loc = input(">>> If it is directly mentioned in any sentence, specify it (1 or 2 ... or 5 or none) :: ")

    connecting_state = f"ST:: {state_trigger}-[{state_loc}]"
    return connecting_state


# ===================================================================
# Get the supporting factors of a query state
# ===================================================================
def get_state_support( focus_state: str):
    state_support_factors = []

    print(f'\n-----------------------------------------------------------------')
    print(f'--STORY:: {story}')
    print(f"\n{{SUPPORTING SENTENCES}} (??) >>=====>> {focus_state}")
    print('-----------------------------------------------------------------')

    factor_trigger = input(f"\n>> Factor trigger (other states in the story) that support or indicates {focus_state} ('none', if there are none) :: ")
    factor_desc = input(">> Description of the supporting factor ('none', if there are none) :: ")

    if (factor_desc == "none"):
        return []

    # Get all the pre-condition events for the "event"
    while (factor_desc != "none"):

        state_support_factors.append(f"ST:: {factor_trigger}-{factor_desc}")

        factor_trigger = input(f"\n>> Factor trigger (other states in the story) that support or indicates {focus_state} ('none', if there are none) :: ")
        factor_desc = input(">> Description of the supporting factor ('none', if there are none) :: ")
            
    return state_support_factors

#----------------------------------------------------------
# Get thr current tree status
#----------------------------------------------------------
def get_tree_status():
    print(f'\n>>Current Tree status: ')
    print_tree(node_ldict[last_event], horizontal=False)

    with open('tree_tracker.txt', 'a') as f:
        with redirect_stdout(f):
            print_tree(node_ldict[last_event], horizontal=False)
    return


# Initilaize the event stack
last_event = init_event_stack()
node_ldict[last_event] = Node(name = last_event, parent = None)

counter = 1
event_stack.append(last_event)

while event_stack != []:

    # Exploring notes in a BFS manner using QUEUE-FIFO, 
    focus_event = event_stack.pop(0)

    #------------------------------------------------------------------------------
    # Resolving the focus event - PART 1 (resolve it's pre-condition event part)
    #-------------------------------------------------------------------------------
    
    # Get the precondition-events of the focus event
    pre_condition_events = get_precondition_event(focus_event)
    for pre_event in pre_condition_events:

        # Get the connecting state between the precondition event and the focus event
        conn_state = get_connecting_state(focus_event = focus_event, pre_cond_event = pre_event)

        # Link focus event to the connecting state
        node_ldict[conn_state] = Node(name = conn_state, parent = node_ldict[focus_event])

        if pre_event not in already_explored_events:

            # Link preconidtion event to the connecting state
            node_ldict[pre_event] = Node(name = pre_event, parent = node_ldict[conn_state])

            # Only if precondition event is not already explored, 
            # Put these pre_condition-event in the queue, 
            # so that it can be resolved later
            event_stack.append(pre_event)

        else:
            # This precondition node is already explored, 
            # so no need to add it to the event eploration queue 
            pre_event_dup_name = f'{pre_event}_{str(counter)}'

            # Link preconidtion event to the connecting state
            node_ldict[pre_event_dup_name] = Node(name = pre_event, parent = node_ldict[conn_state])
            counter += 1

        # Exploration of focus event is done -  add it to the already explored event list
        already_explored_events.append(focus_event)

        print(f'-------------CURRENT TREE STATUS-------------')
        get_tree_status()
        print(f'---------------------------------------------')

    #------------------------------------------------------------------------------
    # Resolving the focus event - PART 2 (resolve it's pre-condition STATE part)
    #-------------------------------------------------------------------------------

    # Get the additional pre-condition states if any
    addn_precondition_states = get_addn_precondition_state(event=focus_event)

    for pre_state in addn_precondition_states:
        # Link the pre-condition state to the focus event
        node_ldict[pre_state] = Node(name = pre_state, parent = node_ldict[focus_event])

print(f'-------------FINAL TREE STATUS-------------')
get_tree_status()
print(f'---------------------------------------------')