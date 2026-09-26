import {tool} from "ai";
import {z} from "zod";

export const dateTimeTool = tool({
    name: "dateTime",
    description: "Get the current date and time",
    inputSchema: z.object({}),
    execute: async ({format}) => {
        const now = new Date();
        return now.toISOString();
    },
});