import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// core components
import Card from "../../../Common/components/Card/Card.js";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// common component imports
import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";
import Table from "../../../Common/components/Table/Table.js";

// custom styling import
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// ..............material ui spinner for loading data...
import useSpinner from "../../../Common/Spinner/Spinner";

// fetch hook
import useAspirants from "../Hooks/useAspirants";

import CustomModal from "./CustomModal";
import AspirantModal from "./AspirantModal.jsx";

const useStyles = makeStyles(dashboardStyle);

// ....parent function
const Aspirants = ({ history, tkn }) => {
	//................hook destructuring start
	const [
		aspirants,
		fetchAspirants,
		txt,
		loader,
		createData,
		viewAsp,
		setViewAsp,
		aspContent,
		clickHandler,
		mapAspIds,
		aspUuids,
		castVote,
	] = useAspirants();

	const [renderSpinner] = useSpinner();

	//...............hook  destructuring end

	// get election id from location
	let pathname = history.location.pathname;
	// ....the election idd is the last bit in the url
	let id = pathname.split("/");
	let electionId = id[2];
	let postId = id[3];

	//........effect hook for fetching Aspirants
	React.useEffect(() => {
		fetchAspirants(tkn, electionId, postId);

		// createData(aspirants)
	}, []);

	// make an array of uuids
	React.useEffect(() => {
		mapAspIds(aspirants);
	}, [aspirants]);

	const classes = useStyles();
	return (
		<Grid container>
			{/* spinner grid */}
			<Grid item className={classes.spinner}>
				{renderSpinner(loader, txt)}
			</Grid>
			<Grid item xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						{/* if no aspirants are available */}
						{aspirants.length < 1 ? (
							<Typography variant="h6" color="secondary">
								NO candidates yet!
							</Typography>
						) : (
							<>
								<h4 className={classes.cardTitleWhite}>Post Candidates</h4>
								<p className={classes.cardCategoryWhite}>
									Here are the aspirants for this post
								</p>
							</>
						)}
					</CardHeader>
					<CardBody>
						{/* datatable */}
						<Table
							tableHeaderColor="primary"
							tableHead={[
								"first name",
								"middle name",
								"last name",
								"id. number",
							]}
							tableData={createData(aspirants)}
							btns={["view", "vote"]}
							clickHandler={clickHandler}
							ids={aspUuids}
						/>
						{/* ......end datatable.... */}
					</CardBody>
				</Card>
			</Grid>
			{/* end card grid .............*/}

			{/* custom modal for viewing  aspirants*/}
			<Grid item className={classes.modal}>
				<CustomModal isOpen={viewAsp} handleClose={setViewAsp}>
					<AspirantModal
						content={aspContent}
						electionId={electionId}
						postId={postId}
						castVote={castVote}
						tkn={tkn}
						loader={loader}
					/>
				</CustomModal>
			</Grid>
			{/* .....end modal.... */}
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		tkn: state.User?.tkn,
	};
};

export default withRouter(connect(mapStateToProps, null)(Aspirants));
