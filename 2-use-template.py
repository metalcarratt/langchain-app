from langchain.prompts import ChatPromptTemplate
from call_llm import callLlm

text = """
안녕하세요, 제 숙제 좀 도와주시겠어요? 숙제가 꽤 많은데, 정말 이해가 안 되는 게 몇 가지 있어요.\
"""

style = """English"""

template = """Please translate the text [{text}] into {style} so I can communicate with someone who can help me."""

prompt_template = ChatPromptTemplate.from_template(template)
print(prompt_template.messages[0].prompt)

messages = prompt_template.format_messages(style=style, text=text)
print(type(messages))
print(type(messages[0]))
print(messages[0])


# Call the model
callLlm(messages)
