import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// core components
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";

// common component imports
import Card from "../../../Common/components/Card/Card.js";
import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";
import CardFooter from "../../../Common/components/Card/CardFooter";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import useSpinner from "../../../Common/Spinner/Spinner";

import useApply from "../Hooks/useApply.js";

const useStyles = makeStyles(dashboardStyle);
const ApplyCandidacy = ({ tkn, history }) => {
	const [applyCandidacy, load, txt, errMsg, electionId] = useApply();
	const [manifesto, setManifesto] = useState("");
	const [picture, setPicture] = useState("");
	const [bgImage, setBgImage] = useState("");
	const [key, setKey] = useState("");

	const classes = useStyles();
	const [renderSpinner] = useSpinner();

	const handleChange = (e) => {
		if (e.target.name === "manifesto") setManifesto(e.target.value);
		else if (e.target.files[0]) {
			setKey(Math.random().toString(36));
			let newFile = window.URL.createObjectURL(e.target.files[0]);
			setBgImage(newFile);
			setPicture(e.target.files[0]);
		}
	};

	const handleSubmit = () => {
		applyCandidacy(tkn, picture, manifesto);
		setBgImage("");
		setPicture("");
		setManifesto("");
	};

	const styles = {
		bgGrid: {
			justifyContent: "center",
		},
		img: {
			maxWidth: "250px",
			justifySelf: "center",
			marginBottom: "1rem",
		},
		removeImgBtn: {
			position: "absolute",
			left: "35%",
			top: "20%",
		},
		textarea: {
			marginBottom: "1rem",
		},
		uploadBtn: {
			margin: "1rem",
		},
		cardFooter: {
			marginTop: "2rem",
		},
	};

	const handleRemove = () => {
		setBgImage("");
		setPicture("")
	};;

	return (
		<Grid container>
			<Grid item xs={12}>
				<Card color="primary">
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>Apply to run</h4>
						<p className={classes.cardCategoryWhite}>
							Fill out the fields below and submit
						</p>
					</CardHeader>

					<CardBody>
						<Grid container>
							<Grid item style={styles.uploadBtn}>
								<Button
									variant="contained"
									color="primary"
									component="label"
									size="small"
								>
									Upload profile picture
									<input
									key={key}
										type="file"
										hidden
										onChange={(e) => handleChange(e)}
										name="picture"
									/>
								</Button>
								{errMsg && errMsg.profile_picture ? (
									<Typography variant="subtitle2" color="secondary">
										{errMsg.profile_picture}
									</Typography>
								) : null}
							</Grid>

							{bgImage ? (
								<Grid item  styles={styles.bgGrid}>
									<img src={bgImage} alt="" style={styles.img} />
									<Button
										style={styles.removeImgBtn}
										variant="contained"
										color="secondary"
										onClick={() => handleRemove()}
										size="small"
									>
										Remove
									</Button>
								</Grid>
							) : null}

							<Grid item xs={12} sm={12} md={8} lg={8} style={styles.textarea}>
								<FormControl
									fullWidth
									variant="filled"
									onSubmit={() => handleSubmit()}
								>
									<TextField
										id="filled-multiline-flexible"
										label="Manifesto"
										multiline
										value={manifesto}
										rows={10}
										name="manifesto"
										onChange={(e) => handleChange(e)}
										variant="filled"
									/>
								</FormControl>
								{errMsg && errMsg.manifesto ? (
									<Typography variant="subtitle2" color="secondary">
										{errMsg.manifesto}
									</Typography>
								) : null}
							</Grid>

							<Grid item xs={12}>
								{renderSpinner(load, txt)}
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => handleSubmit()}
									size="small"
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</CardBody>
					<CardFooter color="primary" style={styles.cardFooter}>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => history.push(`/voting/${electionId}`)}
						>
							Go back to Posts
						</Button>
					</CardFooter>
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
export default withRouter(connect(mapStateToProps, null)(ApplyCandidacy));
