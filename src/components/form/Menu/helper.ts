import moment from 'moment';
import * as yup from 'yup';

type TimeRangeForm = {
  from: string;
  to: string;
};

export const transformMenuForm = (values: any) => {
  const data = { ...values };
  console.log(`values`, values);
  data.time_ranges = values.time_ranges.map((t: TimeRangeForm) => [
    moment(t.from).format('HH:mm'),
    moment(t.to).format('HH:mm')
  ]);

  if (values.allDay) {
    data.time_ranges = ['00:00', '00:00'];
  }

  if (data.start_end_time) {
    data.start_time = moment(data.start_end_time[0]).format('DD/MM/yyyy');
    data.end_time = moment(data.start_end_time[0]).format('DD/MM/yyyy');
  }

  return data;
};

export const menuSchema = yup.object({
  menu_name: yup.string().required('Vui lòng nhập tên bảng giá'),
  time_ranges: yup.array().when('allDay', {
    is: false, // alternatively: (val) => val == true
    then: yup
      .array()
      .of(
        yup.object({
          from: yup.date().required('Vui lòng chọn giờ').typeError('Vui lòng chọn giờ'),
          to: yup.date().required('Vui lòng chọn giờ').typeError('Vui lòng chọn giờ')
        })
      )
      .min(1, 'Vui lòng chọn ít nhất một khung giờ'),
    otherwise: yup.array().min(0)
  })
});
