import React, { FC } from 'react';
import { Block, BlocksPool } from './block';
import { BlockSpan } from './BlockSpan';
import styles from './blocks.module.css';
import { getBlockByUlid } from './helpers';

export const BlocksRow: FC<{
  blocks: Block[];
  gridMinTime: number;
  gridMaxTime: number;
  selectBlock: React.Dispatch<React.SetStateAction<Block | undefined>>;
  blockSearch: string;
  overlappingBlocksId: Set<string>;
  findOverlapBlock: boolean;
}> = ({ blocks, gridMinTime, gridMaxTime, selectBlock, blockSearch, overlappingBlocksId, findOverlapBlock }) => {
  const blockSearchValue = getBlockByUlid(blocks, blockSearch);

  return (
    <div className={styles.row}>
      {blockSearchValue.map<JSX.Element>((b) => {
        return (
          <BlockSpan selectBlock={selectBlock} block={b} gridMaxTime={gridMaxTime} gridMinTime={gridMinTime} key={b.ulid} />
        );
      })}
    </div>
  );
};

export interface SourceViewProps {
  data: BlocksPool;
  title: string;
  gridMinTime: number;
  gridMaxTime: number;
  selectBlock: React.Dispatch<React.SetStateAction<Block | undefined>>;
  blockSearch: string;
  findOverlapBlock: boolean;
  overlapBlocks: Set<string>;
}

export const SourceView: FC<SourceViewProps> = ({
  data,
  title,
  gridMaxTime,
  gridMinTime,
  selectBlock,
  blockSearch,
  findOverlapBlock,
  overlapBlocks,
}) => {
  return (
    <>
      <div className={styles.source}>
        <div className={styles.title} title={title}>
          <span>{title}</span>
        </div>
        <div className={styles.rowsContainer}>
          {Object.keys(data).map((k) => (
            <React.Fragment key={k}>
              {data[k].map((b, i) => (
                <BlocksRow
                  selectBlock={selectBlock}
                  blocks={b}
                  key={`${k}-${i}`}
                  gridMaxTime={gridMaxTime}
                  gridMinTime={gridMinTime}
                  blockSearch={blockSearch}
                  findOverlapBlock={findOverlapBlock}
                  overlappingBlocksId={overlapBlocks}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};
