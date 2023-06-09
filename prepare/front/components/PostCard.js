import React, { useCallback, useState } from 'react';
import { Avatar, Button, Card, Popover, List, Comment } from 'antd';

import {
    RetweetOutlined,
    HeartOutlined,
    HeartTwoTone,
    MessageOutlined,
    EllipsisOutlined,
} from '@ant-design/icons';

import { useSelector } from 'react-redux';

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);
    const id = useSelector((state) => state.user.me?.id);
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key='retweet' />,
                    liked ? (
                        <HeartTwoTone
                            key='heart'
                            twoToneColor='#eb2f96'
                            onClick={onToggleLike}
                        />
                    ) : (
                        <HeartOutlined
                            key='heart'
                            onClick={onToggleLike}
                        />
                    ),
                    <MessageOutlined
                        key='commnet'
                        onClick={onToggleComment}
                    />,
                    <Popover
                        key='more'
                        content={
                            <Button.Group>
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type='danger'>삭제</Button>
                                    </>
                                ) : (
                                    <Button>신고</Button>
                                )}
                            </Button.Group>
                        }
                    >
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                {/* <Image /> */}
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname}</Avatar>}
                    title={post.User.nickname} // 이 부분이 수정되어야 합니다.
                    description={<PostCardContent postData={post.content} />}
                />
                {/* <Buttons></Buttons> */}
            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout='horizontal'
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    );
};

export default PostCard;
