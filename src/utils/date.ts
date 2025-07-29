import dayjs from 'dayjs';

/**
 * 현재 날짜의 시작 시간과 종료 시간을 반환하는 함수
 * @return startOfDay : 현재 날짜의 시작 시간 (00:00:00)
 * @return endOfDay : 현재 날짜의 종료 시간 (23:59:59)
 */
export function getStartEndTime() {
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();
  return { startOfDay, endOfDay };
}
