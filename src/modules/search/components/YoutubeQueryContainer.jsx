import React from 'react';
import {toQueryString} from '../../common/utils';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

const YOUTUBE_API_KEY = 'AIzaSyCum4fCWhpcRNIh8VzD3Fhny5nxYYJrlTI';

function getYoutubeURL(query) {
	return toQueryString({
		q: query,
		key: YOUTUBE_API_KEY,
		part: 'snippet',
		type: 'video',
		videoEmbeddable: true,
		maxResults: 25,
		fields: 'items(snippet,id)'
	});
}

const YOUTUBE_QUERY = gql`
	query Youtube($path: String!) {
		youtubeResults @rest(type: "YoutubePayload", endpoint: "youtube", path: $path) {
			items @type(name: "YoutubeResult") {
				id @type(name: "YoutubeId") {
					videoId
				}
				snippet @type(name: "YoutubeSnippet") {
					title
					thumbnails @type(name: "YoutubeThumbails") {
						default @type(name: "YoutubeThumbnailDefault") {
							url
						}
						high @type(name: "YoutubeThumbnailHigh") {
							url
						}
					}
				}
			}
		}
	}
`;

export const Youtube = {
	fragments: {
		result: gql`
			fragment YoutubeEntry on YoutubeResult {
				id {
					videoId
				}
				snippet {
					title
					thumbnails {
						high {
							url
						}
						default {
							url
						}
					}
				}
			}
		`
	}
};

export default ({search, children}) => {
	if (!search) {
		return children({data: {}});
	}
	return (
		<Query
			query={YOUTUBE_QUERY}
			variables={{path: getYoutubeURL(search)}}
			fetchPolicy="network-only"
			context={{debounceKey: 'YoutubeSearch'}}
		>
			{children}
		</Query>
	);
};