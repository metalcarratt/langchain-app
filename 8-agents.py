from langchain_ollama import ChatOllama
from langchain.agents import load_tools, initialize_agent, AgentType, Tool
from langchain_experimental.agents.agent_toolkits import create_python_agent
from langchain_experimental.tools.python.tool import PythonREPLTool
from langchain.prompts import PromptTemplate
from datetime import date
# import langchain

llm = ChatOllama(model="llama2", temperature=0.7)


# tools = load_tools(["llm-math","wikipedia"], llm=llm)
# agent= initialize_agent(
#     tools, 
#     llm, 
#     agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
#     handle_parsing_errors=True,
#     verbose = True)

#### Math (which it gets wrong)
# print(agent("Calculate 13 ** 0.3432?"))

# response = llm.invoke("What is 13 raised to the 0.3432 power?")
# print(response.content);


#### Wikipedia (also gets it wrong)
# question = "Tom M. Mitchell is an American computer scientist \
# and the Founders University Professor at Carnegie Mellon University (CMU)\
# what book did he write?"
# print(agent(question))


#### Python REPL tool (it's not invoking the tool)
# prompt = PromptTemplate.from_template("""
# You are a Python expert. You have access to a Python REPL tool called Python_REPL.
# Use it to execute any code needed to answer the user's question.
# Only use the tool to run code — do not guess or simulate output.
# If you need to sort a list, write the code and run it using Python_REPL.
# """)
# agent = create_python_agent(
#     llm,
#     tool=PythonREPLTool(),
#     prompt=prompt,
#     verbose=True
# )
# customer_list = [["Harrison", "Chase"], 
#                  ["Lang", "Chain"],
#                  ["Dolly", "Too"],
#                  ["Elle", "Elem"], 
#                  ["Geoff","Fusion"], 
#                  ["Trance","Former"],
#                  ["Jen","Ayai"]
#                 ]
# agent.run(f"""Use Python code to sort these customers by \
# last name and then first name \
# and print the output: {customer_list}""")



#### custom agent
print(str(date.today()))

def get_today_date(_: str) -> str:
    """Returns todays date, use this for any \
    questions related to knowing todays date. \
    The input should always be an empty string, \
    and this function will always return todays \
    date - any date mathmatics should occur \
    outside this function."""
    return str(date.today())

time_tool = Tool(
    name="time",
    func=get_today_date,
    description="""Returns todays date, use this for any \
    questions related to knowing todays date. \
    The input should always be an empty string, \
    and this function will always return todays \
    date - any date mathmatics should occur \
    outside this function."""
)

prompt = PromptTemplate.from_template("""
You are an assistant that uses tools to answer questions. 
Use the tool `time` to get today's date. 
Do not guess or hallucinate. Always use the tool.

Format:
Thought: ...
Action: time
Action Input: ""

Begin!
Question: {input}
""")

agent= initialize_agent(
    [time_tool], 
    llm, 
    agent=AgentType.CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    handle_parsing_errors=True,
    prompt=prompt,
    verbose = True)



try:
    result = agent("whats the date today? Use the `time` tool to get today's date. Do not guess.")
    print(result)
except: 
    print("exception on external access")
