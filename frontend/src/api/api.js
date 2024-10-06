export async function sendImageToLambda(imageFile) {
  try {
    // Convert image to Base64
    // const imageBase64 = await convertImageToBase64(imageFile);
    const imageUri = imageFile.photoUri;
    const imageBase64 = await uriToBase64(imageUri);
    let media_type = getMediaType(imageUri);
    if (media_type == 'jpg') {media_type = 'jpeg';}
    
    // console.log(media_type);
    
    // console.log(imageUri);
    // console.log(imageBase64);

    // Define the API URL
    const apiUrl =
      "https://scffvbb3wntwg7gzbwwasju4nm0dpctb.lambda-url.us-west-2.on.aws/";

    // Payload to be sent to the Lambda function
    const payload = {
      prompt: "prompt included in lambda",
      model_id: "anthropic.claude-3-sonnet-20240229-v1:0",
      system_prompt: "You are a an expert Urban Designer",
      prefix: "[",
      image: imageBase64,
      media_type: media_type
    };
    // Call the API with the image and prompt
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Parse the JSON response
    const data = await response.json(0);
    const arr = JSON.parse(data.response);
    // const json = JSON.parse(data.response);
    return arr;
    // return data.response;
  } catch (error) {
    console.error("Error calling Lambda:", error);
  }
}


import * as FileSystem from "expo-file-system";

async function uriToBase64(uri) {
  try {
    // Read the file as Base64
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64String;
  } catch (error) {
    console.error("Error converting URI to Base64:", error);
    return null;
  }
}

function getMediaType(filename) {
  return filename.split('.').pop();
}