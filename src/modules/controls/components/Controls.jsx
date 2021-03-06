import {VelocityTransitionGroup} from 'velocity-react';
import MediaQuery from 'react-responsive';
import * as React from 'react';
import styled, {css} from 'styled-components';

import {FOOTER_HEIGHT_DESKTOP, FOOTER_HEIGHT_MOBILE} from './constants';
import {device} from '../../../styles/utilities/device';
import {ifElse} from '../../common/utils';
import ExpandButton from './ExpandButton';
import Slider from './Slider';
import SongControls from './SongControls';
import zindex from '../../common/zindex';
import KeyboardControls from './KeyboardControls';
import * as animations from '../../common/animations';

export default function Controls({
	playing,
	expanded,
	togglePlaying,
	toggleExpanded,
	toggleSearch,
	playNext,
	playPrev,
	played,
	duration,
	currentlyPlaying,
	setPlayed
}) {
	const title = currentlyPlaying && (
		<Title centered={expanded}>{currentlyPlaying.info.title}</Title>
	);

	const controls = (
		<MediaControls>
			<SongControls
				playing={playing}
				togglePlaying={togglePlaying}
				playNext={playNext}
				playPrev={playPrev}
			/>
			<Slider played={played} duration={duration} setPlayed={setPlayed} />
		</MediaControls>
	);

	const expandButton = expanded && (
		<RightCenter onClick={toggleExpanded}>
			<ExpandButton />
		</RightCenter>
	);

	const desktop = (
		<Footer>
			<Row transparent={expanded}>
				{title}
				{controls}
				{expandButton}
			</Row>
		</Footer>
	);

	const mobile = (
		<Footer>
			{currentlyPlaying && (
				<Row transparent={expanded} onClick={toggleExpanded}>
					{title}
					<ExpandButton />
				</Row>
			)}
			<Row>{controls}</Row>
		</Footer>
	);

	return (
		<KeyboardControls
			isPlayerOpen={!!currentlyPlaying}
			togglePlaying={togglePlaying}
			toggleExpanded={toggleExpanded}
			toggleSearch={toggleSearch}
		>
			<VelocityTransitionGroup
				enter={{animation: animations.slideUpExpand.in, duration: 400}}
				leave={{animation: animations.slideUpExpand.out}}
			>
				{currentlyPlaying && (
					<MediaQuery query={device.small}>{ifElse(mobile, desktop)}</MediaQuery>
				)}
			</VelocityTransitionGroup>
		</KeyboardControls>
	);
}

const Footer = styled.div`
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: ${zindex('controls')};
	@media ${device.small} {
		height: 9rem;
	}
`;

const Row = styled.div`
	height: ${FOOTER_HEIGHT_DESKTOP};
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${props => !props.transparent && 'rgb(36, 36, 36)'};
	border-top: 0.0625rem solid rgb(64, 64, 64);
	box-sizing: border-box;

	:first-child {
		border-top: none;
	}

	@media ${device.small} {
		height: ${FOOTER_HEIGHT_MOBILE};
	}
`;

const MediaControls = styled.div`
	min-width: 40%;

	@media ${device.small} {
		width: 100%;
	}
`;

const Title = styled.h5`
	position: absolute;
	left: 1.5rem;
	top: 50%;
	transform: translateY(-50%);
	color: rgb(233, 233, 233);
	max-width: 25%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	@media ${device.small} {
		position: static;
		transform: none;
		margin-right: auto;
		margin-left: 0.5rem;
		max-width: 60%;
		font-size: 0.845rem;

		${props =>
			props.centered &&
			css`
				margin: auto;
				font-size: 1rem;
				padding: 0 0.75rem;
				max-width: 100%;
			`};
	}
`;

const RightCenter = styled.div`
	cursor: pointer;
	height: 100%;
	position: absolute;
	right: 0;
	margin-right: 0.5rem;

	:hover {
		${ExpandButton} {
			opacity: 1;
		}
	}
`;
