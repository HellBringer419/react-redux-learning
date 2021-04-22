import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { FC } from "react";
import { Query as QueryType } from "../utils/types";
import Link from "./Link";

const FEED_QUERY = gql`
    {
        feed {
            id
            links {
                id
                createdAt
                url
                description
            }
        }
    }
`;

const LinkList: FC = () => {
    const { data, loading, error } = useQuery<QueryType>(FEED_QUERY);

    if (error)
        console.error(
            `[ERROR] ${
                error?.message
            } during FEED_QUERY at date: [${new Date().toDateString()}], time: [${new Date().toTimeString()}]`
        );

    return (
        <div>
            <h4> Check out all Links </h4>
            <br />
            {data && (
                <div>
                    {data.feed.links.map((link) => (
                        <Link key={link.id} link={link} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default LinkList;
