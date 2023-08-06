import { Configuration, OpenAIApi } from 'openai';

const apiKey = import.meta.env.PUBLIC_OPEN_AI_KEY;

const config = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(config);

export const getChatGPTResponse = async (pokemonName: string) => {
  delete config.baseOptions.headers['User-Agent'];

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Escribe en 50 palabras o menos una descripción del pokemon ${pokemonName}`,
    temperature: 0.9,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return (
    response.data.choices[0]?.text ||
    `No se pudo generar una descripción para ${pokemonName}`
  );
};
