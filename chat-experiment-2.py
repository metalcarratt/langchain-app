from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferWindowMemory
from langchain_ollama import ChatOllama
from langchain.prompts import PromptTemplate

# from transformers import GPT2TokenizerFast
# tokenizer = GPT2TokenizerFast(vocab_file="vocab.json", merges_file="merges.txt")


# memory = ConversationBufferWindowMemory(return_messages=False, k=5)

def buildBot(myName, othersName, myDesc, othersDesc, talkWhere):
    raw="""
    Your name is {myName} and you are an {myDesc} who is talking to {othersDesc} {talkWhere}. The Human's name is {othersName}.
    Do not repeat yourself.
    Make it interesting. Don't let the story go on and on with pointless conversation, the story needs to advance.
    Don't speak too long, no more than a sentence. This is a conversation, not a monologue.
    Respond only as {myName}. Do not write {othersName}'s lines. Keep your response to one sentence.
    Don't return your name, the other person's name on anyone else's name, or any quotation marks. Just give your response.
    Don't speak in the third person. Only answer as your character would answer, and don't give any description about things
    you are doing that we wouldn't know about unless you had said it.
    
    {{history}}
    {othersName}: {{input}}
    """
    filled = raw.format(myName=myName, othersName=othersName, myDesc=myDesc, othersDesc=othersDesc, talkWhere=talkWhere)
    print(f"prompt for {myName} is {filled}")
    prompt = PromptTemplate.from_template(filled)

    llm1 = ChatOllama(model="llama2")

    memory = ConversationBufferWindowMemory(return_messages=False, k=5)
    # memory = ConversationSummaryBufferMemory(return_messages=False, llm=llm1, max_token_limit=100)

    bot = ConversationChain(
        llm=llm1,
        prompt=prompt,
        memory=memory,
        verbose=False
    )

    return bot

def talkToBot(bot, botname, obotname, say):
    # formatted_history = ""
    # for msg in bot.memory.load_memory_variables({})["history"]:
    #     role = obotname if msg.type == "human" else botname
    #     formatted_history += f"{role}: {msg.content}\n"

    # # Fill the prompt with updated history and input
    # filled_prompt = prompt_template.format(history=formatted_history, input=say)

    reply = bot.predict(input=say)
    print(f"{botname}: {reply}\n")
    return reply

def doChat(bot1, bot2, bot1name, bot2name, bot2say):
    bot1say = talkToBot(bot1, bot1name, bot2name, bot2say)
    bot2say = talkToBot(bot2, bot2name, bot1name, bot1say)
    return bot2say


def doWholeChat(bot1, bot2, bot1name, bot2name, initialPrompt):
    print('\n\n')

    print(f"{bot2name}: {initialPrompt}\n")
    bot1.memory.save_context(
        {"input": ""},
        {"output": initialPrompt}
    )

    bot2say = doChat(bot1, bot2, bot1name, bot2name, initialPrompt)
    for number in range(6):
        bot2say = doChat(bot1, bot2, bot1name, bot2name, bot2say)



# bot1 = buildBot('AlienBob', 'AstroMax', 'an an alien from outer space', 'an astronaut', 'on your asteroid')
# bot2 = buildBot('AstroMax', 'AlienBob', 'an astronaut', 'an an alien from outer space', 'on an asteroid')
# # initialPrompt = "Stop! Who are you?"
# doWholeChat(bot1, bot2, 'AlienBob', 'AstroMax', "Stop! Who are you?")

# bot1 = buildBot('Mr Park', 'Mr Kim', 'a very intelligent but someone quirky lawyer', 'a man who has a very troubling legal problem', 'in your office')
# bot2 = buildBot('Mr Kim', 'Mr Park', 'a man who has a very troubling legal problem', 'a very intelligent but someone quirky lawyer', 'in Mr Park\'s office')
# doWholeChat(bot1, bot2, 'Mr Park', 'Mr Kim', "Hi, I need your help.")




# name1='Janice'
# desc1='a busy body who likes poking their nose into other people\' problems'
# location1='at the park'
# name2='Judy'
# desc2='a shy woman who just wants to keep to her self'
# location2='at the park'
# startWith='Oh, Janice, how are you?'


# name1='Mr Park'
# desc1='a very intelligent but someone quirky lawyer'
# location1='in your office'
# name2='Mr Kim'
# desc2='a man who has a very troubling legal problem'
# location2='in Mr Park\'s office'
# startWith='Hi, I need your help.'

name1='Tilly'
desc1='a waitress'
location1='at a coffee shop'
name2='Jane'
desc2='an angry customer'
location2='at a coffee shop'
startWith='Ouch! You spilled that coffee on me!'

bot1 = buildBot(name1, name2, desc1, desc2, location1)
bot2 = buildBot(name2, name1, desc2, desc1, location2)
doWholeChat(bot1, bot2, name1, name2, startWith)