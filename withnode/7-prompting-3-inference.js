import { ChatOllama } from "@langchain/ollama";

// const model = new ChatOllama({model: "llama2"});
const model = new ChatOllama({model: "openhermes"});
const ask = async (p) => {
    const content = (await model.invoke(p)).content;
    console.log(content);
    return content;
}


const lamp_review = `
Needed a nice lamp for my bedroom, and this one had \
additional storage and not too high of a price point. \
Got it fast.  The string to our lamp broke during the \
transit and the company happily sent over a new one. \
Came within a few days as well. It was easy to put \
together.  I had a missing part, so I contacted their \
support and they very quickly got me the missing piece! \
Lumina seems to me to be a great company that cares \
about their customers and products!!
`;

// infer sentiment
// ask(`
//     What is the sentiment of the following product review, 
//     which is delimited with triple quotes?

//     Review text: '''${lamp_review}'''
// `);

// with instruction on output
// ask(`
//     What is the sentiment of the following product review, 
//     which is delimited with triple quotes?

//     Give your answer as a single word, either "positive" \
//     or "negative".

//     Review text: '''${lamp_review}'''
// `);

// identify emotions
// ask(`
//     Identify a list of emotions that the writer of the \
//     following review is expressing. Include no more than \
//     five items in the list. Format your answer as a list of \
//     lower-case words separated by commas.

//     Review text: '''${lamp_review}'''
// `);

// identify anger
// ask(`
//     Is the writer of the following review expressing anger?\
//     The review is delimited with triple backticks. \
//     Give your answer as either yes or no.

//     Review text: '''${lamp_review}'''
// `);

// extract rating
// ask(`
//     Give a rating for the review from 1-5, with 1 as worst and 5 as best.

//     Give your answer as a letter.

//     Review text: '''${lamp_review}'''
// `);

// extract richer information
// ask(`
//     Identify the following items from the review text: 
//     - Item purchased by reviewer
//     - Company that made the item

//     The review is delimited with triple backticks. \
//     Format your response as a JSON object with \
//     "Item" and "Brand" as the keys. 
//     If the information isn't present, use "unknown" \
//     as the value.
//     Make your response as short as possible.

//     Review text: '''${lamp_review}'''
// `);

// extract all things at once
// ask(`
//     Identify the following items from the review text: 
//     - Sentiment (positive or negative)
//     - Is the reviewer expressing anger? (true or false)
//     - Item purchased by reviewer
//     - Company that made the item
//     - A rating for the review from 1-5, with 1 as worst and 5 as best.

//     The review is delimited with triple backticks. \
//     Format your response as a JSON object with \
//     "Sentiment", "Anger", "Item", "Brand" and "Rating" as the keys.
//     If the information isn't present, use "unknown" \
//     as the value.
//     Make your response as short as possible.
//     Format the Anger value as a boolean.
//     Format the Rating value as a number.

//     Review text: '''${lamp_review}'''
// `);


const article = `
    In a recent survey conducted by the government, 
    public sector employees were asked to rate their level 
    of satisfaction with the department they work at. 
    The results revealed that NASA was the most popular 
    department with a satisfaction rating of 95%.

    One NASA employee, John Smith, commented on the findings, 
    stating, "I'm not surprised that NASA came out on top. 
    It's a great place to work with amazing people and 
    incredible opportunities. I'm proud to be a part of 
    such an innovative organization."

    The results were also welcomed by NASA's management team, 
    with Director Tom Johnson stating, "We are thrilled to 
    hear that our employees are satisfied with their work at NASA. 
    We have a talented and dedicated team who work tirelessly 
    to achieve our goals, and it's fantastic to see that their 
    hard work is paying off."

    The survey also revealed that the 
    Social Security Administration had the lowest satisfaction 
    rating, with only 45% of employees indicating they were 
    satisfied with their job. The government has pledged to 
    address the concerns raised by employees in the survey and 
    work towards improving job satisfaction across all departments.
`;

// const lists = await ask(`
//     Determine five topics that are being discussed in the \
//     following text, which is delimited by triple quotes.

//     Make each item one or two words long. 

//     Format your response as a JavaScript list of items separated by commas, with each item is enclosed in double quotes.

//     Text sample: '''${article}'''
// `);
// console.log('list', JSON.parse(lists));

const topic_list = [
    "nasa", "local government", "engineering", 
    "employee satisfaction", "federal government"
]

await ask(`
    Determine whether each item in the following list of \
    topics is a topic in the text below, which
    is delimited with triple backticks.

    Give your answer as follows:
    item from the list: 0 or 1

    List of topics: ${topic_list.join(',')}

    Text sample: '''${article}'''
`);