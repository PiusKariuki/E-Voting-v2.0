import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// core components
import { makeStyles } from "@material-ui/core/styles";
import Card from "../../../Common/components/Card/Card.js";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import useSpinner from "../../../Common/Spinner/Spinner";
import useFetchProfile from "../hooks/useFetchProfile.js";

const useStyles = makeStyles(styles);

const ViewProfile = ({tkn}) => {
	const classes =useStyles();
	const [user, fetchProfile,load, text] = useFetchProfile();
	const [renderSpinner] = useSpinner();
	React.useEffect(() => {
		fetchProfile(tkn);
	}, [])


	return (
		<Grid container>
			<Grid item xs={12}>
				{renderSpinner(load,text)}
			</Grid>
			<Grid item xs={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>User profile</h4>
					</CardHeader>
					<CardBody>
						<Grid container>
							<Grid item xs={12} md={6} lg={6}>
								<p>
									<i>First name :</i>
								</p>
								<p>
									<b>{user.first_name}</b>
								</p>
							</Grid>
							<Grid item xs={12} md={6} lg={6}>
								<p>
									<i>Middle name :</i>
								</p>
								<p>
									<b>{user.middle_name}</b>
								</p>
							</Grid>
							<Grid item xs={12} md={6} lg={6}>
								<p>
									<i>Last name:</i>
								</p>
								<p>
									<b>{user.last_name}</b>
								</p>
							</Grid>
							<Grid item xs={12} md={6} lg={6}>
								<p>
									<i>Email address :</i>
								</p>
								<p>
									<b>{user.email}</b>
								</p>
							</Grid>
							<Grid item xs={12} md={6} lg={6}>
								<p>
									<i>ID. number:</i>
								</p>
								<p>
									<b>{user.identification_number}</b>
								</p>
							</Grid>

						</Grid>
					</CardBody>
				</Card>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		tkn: state.User?.tkn,
	};
};

export default withRouter(connect(mapStateToProps, null)(ViewProfile));
