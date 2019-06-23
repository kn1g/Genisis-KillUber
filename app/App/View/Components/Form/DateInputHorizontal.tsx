// @flow
import React, {RefObject} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {computed, observable} from 'mobx';
import { observer } from 'mobx-react';
import I18n from 'react-native-i18n';
import moment from 'moment';
import NumberInput from './NumberInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dayInput: {
    flexGrow: 1,
    marginRight: 5,
  },
  monthInput: {
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  yearInput: {
    flexGrow: 2,
    marginLeft: 5,
  },
  centered: {
    alignItems: 'center',
  },
});

interface Props {
  date?: number;
  autoFocus?: boolean;
  onChange: (date: number) => any;
  onInputChange: (date: moment.Moment) => any;
}

@observer
export default class DateInputHorizontal extends React.Component<Props> {
  @observable
  day: string = '';
  @observable
  month: string = '';
  @observable
  year: string = '';
  // handle?: IReactionDisposer;
  refMonth: RefObject<TextInput> = React.createRef();
  refYear: RefObject<TextInput> = React.createRef();

  componentDidMount() {
    this.updateState();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.date !== prevProps.date) {
      this.updateState();
    }
  }

  updateState() {
    const dateMoment = this.props.date && this.props.date > 0 ? moment(this.props.date) : undefined;
    this.day = dateMoment ? dateMoment.format('DD') : '';
    this.month = dateMoment ? dateMoment.format('MM') : '';
    this.year = dateMoment ? dateMoment.format('YYYY') : '';
  }

  focusMonth = () => {
    this.refMonth.current && this.refMonth.current.focus();
  };

  focusYear = () => {
    this.refYear.current && this.refYear.current.focus();
  };

  onDayChanged = (value: string) => {
    this.day = value;
    const num = Number(value);
    if (num > 0 && num < 32) {
      if (value.length === 2) {
        this.focusMonth();
      }
      this.props.onInputChange && this.props.onInputChange(this.currentDate);
      if (this.dateValid) {
        this.props.onChange(this.currentDate.valueOf());
      }
    }
  };

  onMonthChanged = (value: string) => {
    this.month = value;
    const num = Number(value);
    if (num > 0 && num < 13) {
      if (value.length === 2) {
        this.focusYear();
      }
      this.props.onInputChange && this.props.onInputChange(this.currentDate);
      if (this.dateValid) {
        this.props.onChange(this.currentDate.valueOf());
      }
    }
  };

  onYearChanged = (value: string) => {
    this.year = value;
    const num = Number(value);
    if (num > 1900 && num < 2100) {
      this.props.onInputChange && this.props.onInputChange(this.currentDate);
      if (this.dateValid) {
        this.props.onChange(this.currentDate.valueOf());
      }
    }
  };

  @computed
  get dateValid(): boolean {
    return (
      this.year.length > 0 &&
      this.month.length > 0 &&
      this.day.length > 0 &&
      this.currentDate.isValid()
    );
  }

  @computed
  get currentDate(): moment.Moment {
    return moment(`${this.year}-${this.month}-${this.day}`);
  }

  @computed
  get dateMoment(): moment.Moment | undefined {
    return this.props.date && this.props.date > 0 ? moment(this.props.date) : undefined;
  }

  render() {
    const {
      day,
      month,
      year,
      props: { autoFocus },
    } = this;
    return (
      <View style={styles.container}>
        <View style={styles.dayInput}>
          <NumberInput
            autoFocus={autoFocus}
            maxLength={2}
            placeholder={I18n.t('signUpFlow.stepAge.DD')}
            onChangeText={this.onDayChanged}
            value={day}
            onSubmitEditing={this.focusMonth}
            error={!this.dateValid}
            mode="outlined"
            label={I18n.t('signUpFlow.stepAge.DD')}
          />
        </View>
        <View style={styles.monthInput}>
          <NumberInput
            inputRef={this.refMonth}
            placeholder="MM"
            maxLength={2}
            onChangeText={this.onMonthChanged}
            value={month}
            onSubmitEditing={this.focusYear}
            error={!this.dateValid}
            mode="outlined"
            label={I18n.t('signUpFlow.stepAge.MM')}
          />
        </View>
        <View style={styles.yearInput}>
          <NumberInput
            inputRef={this.refYear}
            placeholder={I18n.t('signUpFlow.stepAge.YYYY')}
            maxLength={4}
            onChangeText={this.onYearChanged}
            value={year}
            error={!this.dateValid}
            mode="outlined"
            label={I18n.t('signUpFlow.stepAge.YYYY')}
          />
        </View>
      </View>
    );
  }
}
