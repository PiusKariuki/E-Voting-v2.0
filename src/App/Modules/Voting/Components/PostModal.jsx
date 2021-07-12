import React from "react";
// core components
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// common component imports
import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";

// style hook
import { useStyle } from "../Hooks/useStyle";

import Card from "../../../Common/components/Card/Card.js";

const useStyles = makeStyles(useStyle);
const PostModal = ({ content }) => {
	const classes = useStyles();

	return (
		<Card>
			<CardHeader color="primary">
				<h4 className={classes.cardTitleWhite}>{content[0]}</h4>
			</CardHeader>
			<CardBody>
				{/* departments list */}
				{content[1].length > 0 ? (
					<>
						<Typography variant="h6" color="secondary">
							Departments
						</Typography>
						<Grid container>
							{content[1] &&
								content[1].map((department, key) => {
									return (
										<span item key={key} style={{ margin: "2px" }}>
											<Chip label={department.name} />
										</span>
									);
								})}
						</Grid>
					</>
				) : null}

				{content[2].length > 0 ? (
					<>
						<Typography variant="h6" color="secondary">
							Residence
						</Typography>
						<Grid container>
							{content[2] &&
								content[2].map((hall, key) => {
									return (
										<span item style={{ margin: "2px" }} key={key}>
											<Chip label={hall.name} />
										</span>
									);
								})}
						</Grid>
					</>
				) : null}

				<>
					<Typography variant="h6" color="secondary">
						Requirements
					</Typography>
					<Typography variant="body2">{content[3]}</Typography>
				</>

				<>
					<Typography variant="h6" color="secondary">
						Description
					</Typography>
					<Typography variant="body2">{content[4]}</Typography>
				</>
			</CardBody>
		</Card>
	);
};

export default PostModal;
