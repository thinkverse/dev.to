import { h } from 'preact';
import PropTypes from 'prop-types';
import { articlePropTypes } from '../src/components/common-prop-types/article-prop-types';
import {
  ArticleCoverImage,
  CommentsCount,
  CommentsList,
  ContentTitle,
  Meta,
  SaveButton,
  SearchSnippet,
  TagList,
  ReactionsCount,
  ReadingTime,
  Video,
} from './components';
import { PodcastArticle } from './PodcastArticle';

export const Article = ({
  article,
  isFeatured,
  isBookmarked,
  bookmarkClick,
}) => {
  if (article && article.type_of === 'podcast_episodes') {
    return <PodcastArticle article={article} />;
  }

  const clickableClassList = [
    'crayons-story',
    'crayons-story__top',
    'crayons-story__body',
    'crayons-story__indention',
    'crayons-story__title',
    'crayons-story__tags',
    'crayons-story__bottom',
  ];

  return (
    <article
      className={`crayons-story cursor-pointer ${
        isFeatured && 'crayons-story--featured'
      }`}
      id={isFeatured && 'featured-story-marker'}
      data-featured-article={isFeatured && `articles-${article.id}`}
      data-content-user-id={article.user_id}
    >
      <div
        role="presentation"
        onClick={(event) => {
          const { classList } = event.target;

          if (clickableClassList.includes(...classList)) {
            InstantClick.preload(article.path);
            InstantClick.display(article.path);
          }
        }}
      >
        {article.cloudinary_video_url && <Video article={article} />}

        {isFeatured && <ArticleCoverImage article={article} />}
        <div className="crayons-story__body">
          <div className="crayons-story__top">
            <Meta article={article} organization={article.organization} />
          </div>

          <div className="crayons-story__indention">
            <ContentTitle article={article} />
            <TagList tags={article.tag_list} />

            {article.class_name === 'Article' && (
              // eslint-disable-next-line no-underscore-dangle
              <SearchSnippet highlightText={article.highlight} />
            )}

            <div className="crayons-story__bottom">
              {article.class_name !== 'User' && (
                <div className="crayons-story__details">
                  <ReactionsCount article={article} />
                  <CommentsCount
                    count={article.comments_count}
                    articlePath={article.path}
                  />
                </div>
              )}

              <div className="crayons-story__save">
                <ReadingTime readingTime={article.reading_time} />

                <SaveButton
                  article={article}
                  isBookmarked={isBookmarked}
                  onClick={bookmarkClick}
                />
              </div>
            </div>
          </div>
        </div>

        {article.top_comments && article.top_comments.length > 0 && (
          <CommentsList
            comments={article.top_comments}
            articlePath={article.path}
            totalCount={article.comments_count}
          />
        )}
      </div>
    </article>
  );
};

Article.defaultProps = {
  isBookmarked: false,
  isFeatured: false,
};

Article.propTypes = {
  article: articlePropTypes.isRequired,
  isBookmarked: PropTypes.bool,
  isFeatured: PropTypes.bool,
  bookmarkClick: PropTypes.func.isRequired,
};
