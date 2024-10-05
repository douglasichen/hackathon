export async function sendImageToLambda(imageFile) {
  try {
    // Convert image to Base64
    // const imageBase64 = await convertImageToBase64(imageFile);
    const imageUri = imageFile.photoUri;
    const imageBase64 = await uriToBase64(imageUri);
    writeStringToFile("test.txt", imageBase64);
    return;
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
    // const data = await response.json();
    console.log("Lambda Response:", response);
  } catch (error) {
    console.error("Error calling Lambda:", error);
  }
}

// // Function to convert image to Base64 (same as before)
// function convertImageToBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64
//     reader.onerror = reject;
//     reader.readAsDataURL(file);
//   });
// }
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

function removeBase64Prefix(base64String) {
  const prefix = /^data:image\/[a-zA-Z]+;base64,/;
  return base64String.replace(prefix, "");
}

import fs from "fs";

/**
 * Writes a string to a file.
 * @param {string} filename - The name of the file.
 * @param {string} data - The string to write to the file.
 */
function writeStringToFile(filename, data) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File has been written successfully");
    }
  });
}
