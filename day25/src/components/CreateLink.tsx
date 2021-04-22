import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { FC, FormEventHandler, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import { Mutation as MutationType } from "../utils/types";

const CREATE_LINK_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

const CreateLink: FC = () => {
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [createLink] = useMutation<MutationType>(CREATE_LINK_MUTATION, {
        variables: {
            description: description,
            url: url,
        },
    });
    const history: RouteComponentProps["history"] = useHistory();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        try {
            createLink().then(() => history.push("/"));
        } catch (error) {
            console.log("caught ?");

            console.error(
                `[ERROR] ${
                    error?.message
                } during CREATE_LINK_MUTATION at date: [${new Date().toDateString()}], time: [${new Date().toTimeString()}]`
            );
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4> Create a Link </h4>
                <br />
                <div>
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        id="description"
                        placeholder="A description for the link"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label htmlFor="description">Url: </label>
                    <input
                        type="text"
                        id="url"
                        placeholder="The URL for the link"
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                </div>
                <br />
                <div>
                    <button type="submit"> Submit </button>
                    &nbsp; &nbsp; &nbsp;
                    <button type="reset"> Reset </button>
                </div>
            </form>
        </div>
    );
};

export default CreateLink;
