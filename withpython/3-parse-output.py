from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from call_chat_ollama import callLlm


text = """
This leaf blower is pretty amazing. It has four settings: \
candle blower, gentle breeze, windy city, and tornado. \
It arrived in two days, just in time for my wife's \
anniversary present. \
I think my wife liked it so much she was speechless. \
So far I've been the only one using it, and I've been \
using it every other morning to clear the leaves on our lawn. \
It's slightly more expensive than the other leaf blowers \
out there, but I think it's worth it for the extra features. \
"""

gift_schema = ResponseSchema(name="gift", description="Was the item purchased as a gift for someone else? Answer true if yes, false if not or unknown.")
delivery_days_schema = ResponseSchema(name="delivery_days", description="How many days did it take for the product to arrive? If this information is not found, output -1.")
price_value_schema = ResponseSchema(name="price_value", description="Extract any sentences about the value or price, and output them as a comma separated Python list.")

response_schemas = [gift_schema, delivery_days_schema, price_value_schema]
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()
print(format_instructions)


template = """\
For the following text, extract the following information:

gift: Was the item purchased as a gift for someone else? Answer true if yes, false if not or unknown.
delivery_days: How many days did it take for the product to arrive? If this information is not found, output -1.
price_value: Extract any sentences about the value or price, and output them as a comma separated Python list.

text: {text}

{format_instructions}

Please respond with a valid JSON object only. Do not include explanations or extra text. Ensure all keys and values are properly quoted.
"""

prompt_template = ChatPromptTemplate.from_template(template)
messages = prompt_template.format_messages(text=text, format_instructions=format_instructions)

# Call the model
response = callLlm(messages)


output_dict = output_parser.parse(response)
print(output_dict)
print(output_dict.get('gift'))
print(output_dict.get('delivery_days'))
print(output_dict.get('price_value'))