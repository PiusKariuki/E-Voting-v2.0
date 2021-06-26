import React from "react";
import { withRouter } from "react-router-dom";
// core components
import Typography from "@material-ui/core/Typography";
import Card from "../../../Common/components/Card/Card.js";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

// common component imports
import CardHeader from "../../../Common/components/Card/CardHeader.js";
import CardBody from "../../../Common/components/Card/CardBody.js";
import Table from "../../../Common/components/Table/Table.js";
// post and election hooks
import usePosts from "../Hooks/usePosts";
import useFetch from "../Hooks/useFetch";
// style import

import { useStyle } from "../Hooks/useStyle";

// connect component to store
import { connect } from "react-redux";

// ..............material ui spinner for loading data...
import useSpinner from "../../../Common/Spinner/Spinner";

//........... import modal
import CustomModal from "./CustomModal";
// modal children
import PostModal from "./PostModal";

const useStyles = makeStyles(useStyle);

// ........................parent fn...............
const Posts = ({ tkn, history }) => {
	const classes = useStyles(useStyle);
	// get election id from location
	let pathname = history.location.pathname;
	let id = pathname.substring(pathname.lastIndexOf("/") + 1);

	// initialize posts hook
	const [
		loader,
		txt,
		fetchPosts,
		posts,
		createData,
		clickHandler,
		viewPost,
		setViewPost,
		postId,
		postContent,
	] = usePosts();
	// fetchposts on initial render and reloads
	React.useEffect(() => {
		fetchPosts(tkn, id);
	}, []);

	// election hook for btns
	const [election, fetchElection, load, text, createButtons] = useFetch();
	// state hook to store btns
	const [btns, setBtns] = React.useState([]);
	// effect hook to load btns on every update
	React.useEffect(() => {
		setBtns(createButtons());
	}, []);

	return (
		<Grid container>
			<Grid item xs={12} sm={12} md={12}>
				<Card>
					<CardHeader color="primary">
						<h4 className={classes.cardTitleWhite}>Election Posts</h4>
						<p className={classes.cardCategoryWhite}>
							Here are the posts available for this election
						</p>
					</CardHeader>
					<CardBody>
						{/* datatable */}
						<Table
							tableHeaderColor="danger"
							tableHead={["name", "bound", "verified candidates", "voted yet"]}
							tableData={createData(posts)}
							btns={btns}
							clickHandler={clickHandler}
						/>
						{/* ......end datatable.... */}
					</CardBody>
				</Card>
			</Grid>

			{/* custom modal for viewing  posts*/}
			<Grid item className={classes.modal} >
				<CustomModal
					isOpen={viewPost}
					handleClose={setViewPost}	
				>
					<PostModal content={postContent} />
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

export default withRouter(connect(mapStateToProps, null)(Posts));
