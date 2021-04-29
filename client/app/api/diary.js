import {instance} from './index';

export function deleteDiary(id) {
  return instance.put(`diary/delete/${id}`);
}

export function findDiary(id) {
  return instance.get(`diary/find/${id}`);
}

export function findAllDiary() {
  return instance.get('diary/findAll');
}

export function findDiaryByDate(date) {
  return instance.get(`diary/findByDate/${date}`);
}

export function updateDiary(id, params) {
  return instance.put(`diary/update/${id}`, params);
}

export function writeDiary(params) {
  return instance.post('diary/write', params);
}
