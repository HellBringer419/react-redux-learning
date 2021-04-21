import { FC } from "react";
import { Link as LinkType } from "../utils/types";

const Link: FC<{link: LinkType}> = ({ link }) => {
    return (
        <div>
            <div>
                {link.description} ({link.url})
            </div>
        </div>
    );
};

export default Link;
