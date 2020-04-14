import {Request, Response} from "express";
import {Team} from "../../types";

export default async (req: Request, res: Response) => {
	const responseData: {
		id: string;
		username: string;
		name: string;
		nickname: string;
		teams?: Team[];
	} = {
		id: req.user.id,
		username: req.user.username,
		name: req.user.name,
		nickname: req.user.nickname
	};

	//Team List
	if (req.token.scopes.includes("teams")) {
		responseData.teams = (await req.user.getTeams()).map(
			(team: Team): Team => ({
				id: team.id,
				slug: team.slug,
				name: team.name
			})
		);
	}

	res.json(responseData);
};
