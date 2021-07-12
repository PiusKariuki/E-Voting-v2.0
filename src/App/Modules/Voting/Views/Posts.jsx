import React from "react";
import { withRouter } from "react-router-dom";
// core components
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

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

// connect component to store
import { connect } from "react-redux";

// ..............material ui spinner for loading data...
import useSpinner from "../../../Common/Spinner/Spinner";

//........... import modal
import CustomModal from "../Components/CustomModal";
// modal children
import PostModal from "../Components/PostModal";

const useStyles = makeStyles(dashboardStyle);

// ........................parent fn...............
const Posts = ({ tkn, history }) => {
	const classes = useStyles(useStyles);
	// get election id from location
	let pathname = history.location.pathname;
	// ....the election idd is the last bit in the url
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
    cols,
    mapPostIds,
    postUuids, 
	] = usePosts();

	// ....redirect fn...............
	const navigate = () => {
		if (postId !== "") history.push(`/voting/${id}/${postId}`);
	};
	React.useEffect(() => {
		navigate();
		// call map fn to make an array of all ids in the posts for refing in the table
	}, [clickHandler]);

	// election hook for btns
	const [election, fetchElection, load, text, btns] = useFetch();

	// fetchposts on initial render and reloads create btns too
	React.useEffect(() => {
		fetchPosts(tkn, id);
		fetchElection(tkn);
		
	}, []);

	React.useEffect(() => {
		mapPostIds(posts);
	}, [posts])

	// spinner hook
	const [renderSpinner] = useSpinner();

	return (
		<Grid container>
			{/* spinner  */}
			<Grid item className={classes.spinner}>
				{renderSpinner(loader, txt)}
			</Grid>
			{/* ..................card   */}
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
							tableHeaderColor="primary"
							tableHead={cols}
							// ...a function in our custom hook that populates the table
							tableData={createData()}
							btns={btns}
							clickHandler={clickHandler}
							ids={postUuids}
						/>
						{/* ......end datatable.... */}
					</CardBody>
				</Card>
			</Grid>
			{/* ...................end card........ */}

			{/* custom modal for viewing  posts*/}
			<Grid item className={classes.modal}>
				<CustomModal isOpen={viewPost} handleClose={setViewPost}>
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
