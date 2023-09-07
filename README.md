# NC News (mobile version only. desktop version in progress)

NC (Northcoders) news is a social aggregation, web content rating and discussion website. It has articles which are divided into topics, and each article has a user-curated ratings from upvotes and downvotes using the API. Users can also add comments about an article. See https://nc-news-hjaox.netlify.app/ to see the deployed version.

The purpose of this repository is to serve as a front-end architecture for the back-end API I have built. The link for the API is https://github.com/hjaox/be-nc-news.

SOURCE CODE:

    To make a local copy of the repository:
        -On your terminal, go to your desired folder to make a copy of the repository and type `https://github.com/hjaox/fe-nc-news.git`. This will make a clone of the repository.

        Requirements:
            Certain dependencies and devDependencies must be installed to be able to run the the code smoothly.

            -type `npm i` to install modules listed in package.json. It includes:
                dependencies:
                    "axios": "^1.5.0",
                    "react": "^18.2.0",
                    "react-bootstrap": "^2.8.0",
                    "react-dom": "^18.2.0",
                    "react-router-dom": "^6.15.0"
                devDependencies (for testing purposes)
                    "@types/react": "^18.2.15",
                    "@types/react-dom": "^18.2.7",
                    "@vitejs/plugin-react": "^4.0.3",
                    "eslint": "^8.45.0",
                    "eslint-plugin-react": "^7.32.2",
                    "eslint-plugin-react-hooks": "^4.6.0",
                    "eslint-plugin-react-refresh": "^0.4.3",
                    "vite": "^4.4.5"

            This repository was built with:
                    node: v20.5.1
    