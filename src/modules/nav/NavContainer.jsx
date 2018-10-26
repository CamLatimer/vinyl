import {Link} from 'react-router-dom';
import * as React from 'react';
import styled, {css} from 'styled-components';
import {device} from '../../styles/utilities/device';

import {ROUTES} from '../routes/routes';
import zindex from '../common/zindex';

import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import TrackFragments from '../common/fragments/TrackFragments';

const query = gql`
	query PlayerContainer {
		player @client {
			currentlyPlaying {
				...AllTrack
			}
			expanded
		}
	}
	${TrackFragments.all}
`;

export default function Nav(expanded) {
	return (
		<StyledNav expanded={expanded} landing={location.pathname === ROUTES.LANDING}>
			<Link to={ROUTES.LANDING} key={'home'}>
				OPENRECORD
			</Link>
		</StyledNav>
	);
}

const StyledNav = styled.nav`
	background: red;
	padding: 1rem 0;
	position: fixed;
	width: 100%;
	text-align: center;
	z-index: ${zindex('nav')};

	${props =>
		props.expanded &&
		css`
			background: none;
		`} ${props =>
		props.landing &&
		css`
			background: none;
		`}

	a {
		display: inline-block;
		cursor: pointer;

		color: white;
		font-size: 1.25rem;
		letter-spacing: 0.0675rem;
		position: relative;

		transition: all 0.1s;
		transition: all 0.1s;
		vertical-align: middle;

		&:hover {
			text-decoration: underline;
		}
	}

	@media ${device.small} {
		display: ${props => (props.landing ? 'inherit' : 'none')};
	}
`;
