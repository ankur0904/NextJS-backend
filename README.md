# NextJS Chat Extension Backend

This backend of the extension is built using NextJS. It is used to provide real-time responses to the queries of the users.

## Requirements for Local Installation

- [NodeJS](https://nodejs.org/en/) *Recommended: (v18.18.0)*
- [pnpm](https://pnpm.io/) *Recommended: (v8.10.0)*
- [Git](https://git-scm.com/downloads) *Version Control*
- [Postman](https://www.postman.com/downloads/) *API Testing*
- [OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5](https://huggingface.co/OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5) *AI Model*

## Features

- **API:** The extension uses the NextJS API to provide real-time responses to the queries of the users. This API endpoint `http://localhost:3000/api/generateResponse` is called by the extension to get the response and this also helps to serve the content of the body in the `json` for mat.

- **Error Handling:** The backend is also responsible for the handing different types of errors which can occur during the process.

- **Responsible for interacting with AI model:** The backend are also responsible for interacting with the AI model `OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5` to get the response for the query of the user.

## Local Installation

1. **Firstly Clone the repository**

    ```bash
    git clone https://github.com/ankur0904/NextJS-backend.git
    ```

2. **Install the dependencies**
    ```bash
    pnpm install
    ```

3. Set up the environment variable.
    - Create a `.env.local` file in the root directory of the project.
    - Get the API Key from [here](https://huggingface.co/)
    - And paste the value like this:
    ```
        HUGGING_FACE_API_KEY=<API_KEY>
    ```

4. **Run the development server**
    ```bash
    pnpm dev
    ```

5. **Test the server**
    
    You can use Postman to test the server `API endpoints.`
    - Paste the `http://localhost:3000/api/generateResponse` in the URL bar.
    - Select the `POST` method.
    - Click on the `Body` tab, then `raw` and then select `JSON` from the dropdown and paste the following JSON in the body.
        ```json
        {
            "command": "What is 70% of 100?"
        }
        ```
        > Remember the key must be `command`.
    - Click on the `Send` button.
    
6. **Done 🎉**
    - You will get the response in the body like this:
    ```json
    [
        {
            "generated_text": "What is 70% of 100?\n\n70% of 100 is 70.\n\nTherefore, 70% of 100 is 70."
        }
    ]
    ```
