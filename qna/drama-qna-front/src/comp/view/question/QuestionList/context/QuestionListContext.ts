import React from 'react';
import { SortDirection } from '@nara.drama/prologue';


export type QuestionListContextModel = {
  questionList: {
    readerId: string;
    groupId: string;
    groupTags: string[];
    sortDirection: SortDirection;
    onChangeSortDirection: (sortDirection: SortDirection) => void;
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
  };
};

const QuestionListContext = React.createContext<QuestionListContextModel>({
  questionList: {
    readerId: '',
    groupId: '',
    groupTags: [],
    sortDirection: SortDirection.Descending,
    onChangeSortDirection: () => {},
    tags: [],
    onAddTag: () => {},
    onRemoveTag: () => {},
  },
});

export default QuestionListContext;
