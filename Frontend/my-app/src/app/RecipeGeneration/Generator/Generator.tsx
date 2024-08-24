//FineGraninner : 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
import {HfInference} from "@huggingface/inference"

const Generator =async(ingredients:string) => {
      const hf=new HfInference('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')

      const ep = hf.endpoint(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
      );

      const stream=ep.chatCompletionStream({
        model:"tgi",
        messages:[{role:"user",content:`Generate a recipe with the following input : ${ingredients}`}],
        max_tokens:500,
        temperature:0.1,
        seed:0,
      })
      
      let output="";

      for await (const chunk of stream){
        if(chunk.choices && chunk.choices.length > 0){
          if(chunk.choices[0].delta.content!==undefined){
           output+=chunk.choices[0].delta.content;
          }
        }
      }

      return output;
}


export default Generator