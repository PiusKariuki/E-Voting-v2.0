import React from "react";
// core components
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// common component imports
import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";
import CardFooter from "../../../Common/components/Card/CardFooter";

// style hook
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Card from "../../../Common/components/Card/Card.js";

// ..............material ui spinner for loading data...
import useSpinner from "../../../Common/Spinner/Spinner";

const useStyles = makeStyles(dashboardStyle);

const AspirantModal = ({ content, electionId, postId, castVote, tkn, loader }) => {

	const [renderSpinner] = useSpinner();
	const classes = useStyles();
	return (
		<Card>
			<CardHeader color="primary">
				{/*post name index 0 */}
				<h4 className={classes.cardTitleWhite}>{content[0]}</h4>
			</CardHeader>
			<CardBody>
				{/* image url index 1 */}
				<Grid container className={classes.container}>
					<Grid item xs={12} sm={12} md={6} lg={6}>
						<img src={content[1]} alt="" className={classes.img} />
					</Grid>
					{/* index 2 is manifesto */}
					<Grid item xs={12} sm={12} md={5} lg={5}>
						<Typography variant="h6" color="secondary">
							Manifesto:
						</Typography>
						<Typography variant="body2" >
							{content[2]}
						</Typography>
					</Grid>
				</Grid>

				{renderSpinner(loader, "Processing vote...please wait")}
			</CardBody>
			{content.length > 3 ? <CardFooter>
				{/* ........post.uuid in index 3 */}
				<Button variant="contained" color="primary" size="small"
					onClick={()=> castVote(tkn, electionId, postId,content[3])}>Cast Vote</Button>
			</CardFooter> : null}
		</Card>
	);
};

export default AspirantModal;
