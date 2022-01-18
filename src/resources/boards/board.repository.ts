import { Board } from './board.model';
import { getRepository } from "typeorm";

const findById = async (id: string) => {
  const repository = await getRepository(Board);

  return repository.findOne({id: id});
}

const findAll = async () => {
  const repository = await getRepository(Board);

  return repository.find();    
}

const createBoard = async (board: Omit<Board, 'id'>) => {
  const repository = await getRepository(Board);

  return await repository.save((board));
}

const editBoard = async (id: string, board: Board) => {
  const repository = await getRepository(Board);
  const editBoard = await repository.findOne({id: id});
  if (!editBoard) {
    return false;
  }
  const _board = { ...editBoard, ...board };
  await repository.save(_board);
  return _board;
}

const deleteBoard = async (id: string) => {
  const repository = await getRepository(Board);
  const delBoard = await repository.findOne({id: id});
  if (!delBoard) {
    return false;
  }
  await repository.remove(delBoard);
  return true;
} 

export default { 
findById,
findAll,
createBoard,
editBoard,
deleteBoard
};
