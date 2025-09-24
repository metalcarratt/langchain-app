import { ChatOllama } from "@langchain/ollama";

const model = new ChatOllama({model: "openhermes"});

const factSheetChair = `
OVERVIEW
- Part of a beautiful family of mid-century inspired office furniture, 
including filing cabinets, desks, bookcases, meeting tables, and more.
- Several options of shell color and base finishes.
- Available with plastic back and front upholstery (SWC-100) 
or full upholstery (SWC-110) in 10 fabric and 6 leather options.
- Base finish options are: stainless steel, matte black, 
gloss white, or chrome.
- Chair is available with or without armrests.
- Suitable for home or business settings.
- Qualified for contract use.

CONSTRUCTION
- 5-wheel plastic coated aluminum base.
- Pneumatic chair adjust for easy raise/lower action.

DIMENSIONS
- WIDTH 53 CM | 20.87”
- DEPTH 51 CM | 20.08”
- HEIGHT 80 CM | 31.50”
- SEAT HEIGHT 44 CM | 17.32”
- SEAT DEPTH 41 CM | 16.14”

OPTIONS
- Soft or hard-floor caster options.
- Two choices of seat foam densities: 
 medium (1.8 lb/ft3) or high (2.8 lb/ft3)
- Armless or 8 position PU armrests 

MATERIALS
SHELL BASE GLIDER
- Cast Aluminum with modified nylon PA6/PA66 coating.
- Shell thickness: 10 mm.
SEAT
- HD36 foam

COUNTRY OF ORIGIN
- Italy
`;

const getProductDescription = async () => {
    const prompt = `
    Your task is to help a marketing team create a 
    description for a retail website of a product based 
    on a technical fact sheet.

    Write a product description based on the information 
    provided in the technical specifications delimited by 
    triple quotes.

    Technical specifications: """${factSheetChair}"""
    `;

    const response = await model.invoke(prompt);
    console.log(response.content);
}
// getProductDescription();

const requestShorter = async () => {
        const prompt = `
    Your task is to help a marketing team create a 
    description for a retail website of a product based 
    on a technical fact sheet.

    Write a product description based on the information 
    provided in the technical specifications delimited by 
    triple quotes.

    Use at most 50 words.

    Technical specifications: """${factSheetChair}"""
    `;

    const response = await model.invoke(prompt);
    console.log(response.content);
    console.log(response.content.length);
}
// requestShorter();

const requestMoreTargetedAudience = async () => {
            const prompt = `
    Your task is to help a marketing team create a 
    description for a retail website of a product based 
    on a technical fact sheet.

    Write a product description based on the information 
    provided in the technical specifications delimited by 
    triple quotes.

    The description is intended for furniture retailers, 
    so should be technical in nature and focus on the 
    materials the product is constructed from.

    At the end of the description, include every 7-character 
    Product ID in the technical specification.

    Use at most 50 words.

    Technical specifications: """${factSheetChair}"""
    `;

    const response = await model.invoke(prompt);
    console.log(response.content);
}
requestMoreTargetedAudience();