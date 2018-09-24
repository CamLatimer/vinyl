import React from 'react';

import {Mutation} from 'react-apollo';
import Queue from './Queue';
import gql from 'graphql-tag';
import WithPlaylistId from '../../common/components/WithPlaylistId';
import TrackFragments from '../../common/fragments/TrackFragments';
import SpinnerQuery from '../../common/components/SpinnerQuery';
import {nullToUndefined} from '../../common/utils';
import adapt from '../../common/components/Adapt';

const query = gql`
	query Queue($playlist: String!) {
		playlist(where: {name: $playlist}) {
			id
			name
			tracks {
				...AllTrack
			}
		}

		player @client {
			currentlyPlaying {
				id
			}
		}
	}
	${TrackFragments.all}
`;

const UPDATE_PLAYING = gql`
	mutation UpdatePlaying($track: Track!) {
		updatePlaying(track: $track) @client
	}
`;

const DELETE_TRACK = gql`
	mutation DeleteTrack($playlist: String!, $trackId: ID!) {
		updatePlaylist(where: {name: $playlist}, data: {tracks: {delete: [{id: $trackId}]}}) {
			id
			tracks {
				id
			}
		}
	}
`;

const Composed = adapt(
	{
		playlist: <WithPlaylistId />,
		updatePlaying: <Mutation mutation={UPDATE_PLAYING} />,
		deleteTrack: <Mutation mutation={DELETE_TRACK} />
	},
	{
		data: ({render, playlist}) => (
			<SpinnerQuery query={query} variables={{playlist}} postProcess={nullToUndefined}>
				{({data}) => render(data)}
			</SpinnerQuery>
		)
	}
);

export default function QueueContainer() {
	return (
		<Composed>
			{({
				data: {
					playlist: {tracks} = {tracks: []},
					player: {currentlyPlaying}
				},
				playlist,
				updatePlaying,
				deleteTrack
			}) => (
				<Queue
					tracks={tracks}
					updatePlaying={track => updatePlaying({variables: {track}})}
					deleteTrack={track => deleteTrack({variables: {playlist, trackId: track.id}})}
					currentlyPlayingId={currentlyPlaying && currentlyPlaying.id}
				/>
			)}
		</Composed>
	);
}
