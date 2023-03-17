declare module "InfluxClient" {
  export interface InfluxClientConfig {
    url: string
    token: string
    org: string
    bucket: string
    username: string
    password: string
  }

  export type InfluxDataType = 'integer' | 'float' | 'string'

  export type InfluxTagField = 'machine_code' | 'protocol_type'

  //type 0
  export type InfluxPressDataField =
      'manufacturer'|
      'version'|
      'press_spm'|
      'press_angle'|
      'press_main_motor_current'|
      'press_slide_motor_current'|
      'press_inverter_spm'|
      'press_preset_counter'|
      'press_total_counter'|
      'press_whole_counter'|
      'press_preset_limit_counter'|
      'cycle_index'|
      'press_temperature_value_1'|
      'press_temperature_value_2'|
      'press_temperature_value_3'|
      'press_temperature_value_4'|
      'press_temperature_value_5'|
      'press_temperature_value_6'|
      'press_temperature_value_7'|
      'press_temperature_value_8'|
      'press_safety_one_cycle_stop_angle'|
      'press_safety_one_cycle_slip_angle'|
      'press_key_cam'|
      'press_run_ready'|
      'press_run_ok'|
      'press_motor_state'|
      'press_motor_vector'|
      'press_run_state'|
      'press_error_number'|
      'press_slide_top_position'|
      'press_operator_run_time'|
      'press_operator_stop_time'|
      'press_operator_run_ms'|
      'press_operator_stop_ms'|
      'press_in_1'|
      'press_in_2'|
      'press_in_3'|
      'press_in_4'|
      'press_in_5'|
      'press_in_6'|
      'press_in_7'|
      'press_in_8'|
      'press_in_9'|
      'press_in_10'|
      'press_in_11'|
      'press_in_12'|
      'press_in_13'|
      'press_in_14'|
      'press_in_15'|
      'press_in_16'|
      'press_in_17'|
      'press_in_18'|
      'press_in_19'|
      'press_in_20'|
      'press_in_21'|
      'press_in_22'|
      'press_in_23'|
      'press_in_24'|
      'press_in_25'|
      'press_in_26'|
      'press_in_27'|
      'press_in_28'|
      'press_in_29'|
      'press_in_30'|
      'press_in_31'|
      'press_in_32'|
      'press_in_33'|
      'press_in_34'|
      'press_in_35'|
      'press_in_36'|
      'press_in_37'|
      'press_in_38'|
      'press_out_1'|
      'press_out_2'|
      'press_out_3'|
      'press_out_4'|
      'press_out_5'|
      'press_out_6'|
      'press_out_7'|
      'press_out_8'|
      'press_out_9'|
      'press_out_10'|
      'press_out_11'|
      'press_out_12'|
      'press_out_13'|
      'press_out_14'|
      'press_out_15'|
      'press_out_16'|
      'press_out_17'|
      'press_out_18'|
      'press_out_19'|
      'press_out_20'|
      'press_out_21'|
      'press_out_22'|
      'press_out_23'|
      'press_out_24'|
      'press_out_25'|
      'press_out_26'|
      'press_out_27'|
      'press_out_28'|
      'press_out_29'|
      'press_error_state_1'|
      'press_error_state_2'|
      'press_error_state_3'|
      'press_error_state_4'|
      'press_error_state_5'|
      'press_error_state_6'|
      'press_error_state_7'|
      'press_error_state_8'|
      'press_error_state_9'|
      'press_error_state_10'|
      'press_error_state_11'|
      'press_error_state_12'|
      'press_error_state_13'|
      'press_error_state_14'|
      'press_error_state_15'|
      'press_error_state_16'|
      'press_error_state_17'|
      'press_error_state_18'|
      'press_error_state_19'|
      'press_error_state_20'|
      'press_error_state_21'|
      'press_error_state_22'|
      'press_error_state_23'|
      'press_error_state_24'|
      'press_error_state_25'|
      'press_error_state_26'|
      'press_error_state_27'|
      'press_error_state_28'|
      'press_error_state_29'|
      'press_error_state_30'|
      'press_error_state_31'|
      'press_error_state_32'|
      'press_error_state_33'|
      'press_error_state_34'|
      'press_error_state_35'|
      'press_error_state_36'|
      'press_error_state_37'|
      'press_error_state_38'|
      'press_error_state_39'|
      'press_error_state_40'|
      'press_error_state_41'|
      'press_error_state_42'|
      'press_error_state_43'|
      'press_error_state_44'|
      'press_error_state_45'|
      'press_error_state_46'|
      'press_error_state_47'|
      'press_error_state_48'|
      'press_error_state_49'|
      'press_error_state_50'|
      'press_error_state_51'|
      'press_error_state_52'|
      'press_error_state_53'|
      'press_error_state_54'|
      'press_error_state_55'|
      'press_error_state_56'|
      'press_error_state_57'|
      'press_error_state_58'|
      'press_error_state_59'|
      'press_error_state_60'|
      'press_error_state_61'|
      'press_error_state_62'|
      'press_error_state_63'|
      'press_error_state_64'|
      'press_error_state_65'|
      'press_error_state_66'|
      'press_error_state_67'|
      'press_error_state_68'|
      'press_error_state_69'|
      'press_error_state_70'|
      'press_error_state_71'|
      'press_error_state_72'|
      'press_error_state_73'|
      'press_error_state_74'|
      'press_error_state_75'|
      'press_error_state_76'|
      'press_error_state_77'|
      'press_error_state_78'|
      'press_error_state_79'|
      'press_error_state_80'|
      'press_error_state_81'|
      'press_error_state_82'|
      'press_error_state_83'|
      'press_error_state_84'|
      'press_error_state_85'|
      'press_error_state_86'|
      'press_error_state_87'|
      'press_error_state_88'|
      'press_error_state_89'|
      'press_error_state_90'|
      'press_error_state_91'|
      'press_error_state_92'|
      'press_error_state_93'|
      'press_error_state_94'|
      'press_error_state_95'|
      'press_error_state_96'|
      'press_error_state_97'|
      'press_error_state_98'|
      'press_error_state_99'

  // type 1
  export type InfluxPressMonDataField =
      'manufacturer'|
      'version'|
      'protocol_type'|
      'machine_code'|
      'flag_count'|
      'total_ton'|
      'total_ton_max'|
      'total_ton_avg'|
      'total_ton_sensor'|
      'ch1_ton_sensor'|
      'ch2_ton_sensor'|
      '_ton_left_160'|
      '_ton_left_161'|
      '_ton_left_162'|
      '_ton_left_163'|
      '_ton_left_164'|
      '_ton_left_165'|
      '_ton_left_166'|
      '_ton_left_167'|
      '_ton_left_168'|
      '_ton_left_169'|
      '_ton_left_170'|
      '_ton_left_171'|
      '_ton_left_172'|
      '_ton_left_173'|
      '_ton_left_174'|
      '_ton_left_175'|
      '_ton_left_176'|
      '_ton_left_177'|
      '_ton_left_178'|
      '_ton_left_179'|
      '_ton_left_180'|
      '_ton_left_181'|
      '_ton_left_182'|
      '_ton_left_183'|
      '_ton_left_184'|
      '_ton_left_185'|
      '_ton_left_186'|
      '_ton_left_187'|
      '_ton_left_188'|
      '_ton_left_189'|
      '_ton_left_190'|
      '_ton_left_191'|
      '_ton_left_192'|
      '_ton_left_193'|
      '_ton_left_194'|
      '_ton_left_195'|
      '_ton_left_196'|
      '_ton_left_197'|
      '_ton_left_198'|
      '_ton_left_199'|
      '_ton_left_200'|
      '_ton_right_160'|
      '_ton_right_161'|
      '_ton_right_162'|
      '_ton_right_163'|
      '_ton_right_164'|
      '_ton_right_165'|
      '_ton_right_166'|
      '_ton_right_167'|
      '_ton_right_168'|
      '_ton_right_169'|
      '_ton_right_170'|
      '_ton_right_171'|
      '_ton_right_172'|
      '_ton_right_173'|
      '_ton_right_174'|
      '_ton_right_175'|
      '_ton_right_176'|
      '_ton_right_177'|
      '_ton_right_178'|
      '_ton_right_179'|
      '_ton_right_180'|
      '_ton_right_181'|
      '_ton_right_182'|
      '_ton_right_183'|
      '_ton_right_184'|
      '_ton_right_185'|
      '_ton_right_186'|
      '_ton_right_187'|
      '_ton_right_188'|
      '_ton_right_189'|
      '_ton_right_190'|
      '_ton_right_191'|
      '_ton_right_192'|
      '_ton_right_193'|
      '_ton_right_194'|
      '_ton_right_195'|
      '_ton_right_196'|
      '_ton_right_197'|
      '_ton_right_198'|
      '_ton_right_199'|
      '_ton_right_200'|
      'load_energy'

  //type 2
  export type InfluxParamField =
      'manufacturer'|
      'version'|
      'length'|
      'flag_count'|
      'press_parameter_0'|
      'press_parameter_1'|
      'press_parameter_2'|
      'press_parameter_3'|
      'press_parameter_4'|
      'press_parameter_5'|
      'press_parameter_6'|
      'press_parameter_7'|
      'press_parameter_8'|
      'press_parameter_9'|
      'press_parameter_10'|
      'press_parameter_11'|
      'press_parameter_12'|
      'press_parameter_13'|
      'press_parameter_14'|
      'press_parameter_15'|
      'press_parameter_16'|
      'press_parameter_17'|
      'press_parameter_18'|
      'press_parameter_19'|
      'press_parameter_20'|
      'press_parameter_21'|
      'press_parameter_22'|
      'press_parameter_23'|
      'press_parameter_24'|
      'press_parameter_25'|
      'press_parameter_26'|
      'press_parameter_27'|
      'press_parameter_28'|
      'press_parameter_29'|
      'press_parameter_30'|
      'press_parameter_31'|
      'press_parameter_32'|
      'press_parameter_33'|
      'press_parameter_34'|
      'press_parameter_35'|
      'press_parameter_36'|
      'press_parameter_37'|
      'press_parameter_38'|
      'press_parameter_39'|
      'press_parameter_40'|
      'press_parameter_41'|
      'press_parameter_42'|
      'press_parameter_43'|
      'press_parameter_44'|
      'press_parameter_45'|
      'press_parameter_46'|
      'press_parameter_47'|
      'press_parameter_48'|
      'press_parameter_49'|
      'press_parameter_50'|
      'press_parameter_51'|
      'press_parameter_52'|
      'press_parameter_53'|
      'press_parameter_54'|
      'press_parameter_55'|
      'press_parameter_56'|
      'press_parameter_57'|
      'press_parameter_58'|
      'press_parameter_59'|
      'press_parameter_60'|
      'press_parameter_61'|
      'press_parameter_62'|
      'press_parameter_63'|
      'press_parameter_64'|
      'press_parameter_65'|
      'press_parameter_66'|
      'press_parameter_67'|
      'press_parameter_68'|
      'press_parameter_69'|
      'press_parameter_70'|
      'press_parameter_71'|
      'press_parameter_72'|
      'press_parameter_73'|
      'press_parameter_74'|
      'press_parameter_75'|
      'press_parameter_76'|
      'press_parameter_77'|
      'press_parameter_78'|
      'press_parameter_79'|
      'press_parameter_80'|
      'press_parameter_81'|
      'press_parameter_82'|
      'press_parameter_83'|
      'press_parameter_84'|
      'press_parameter_85'|
      'press_parameter_86'|
      'press_parameter_87'|
      'press_parameter_88'|
      'press_parameter_89'|
      'press_parameter_90'|
      'press_parameter_91'|
      'press_parameter_92'|
      'press_parameter_93'|
      'press_parameter_94'|
      'press_parameter_95'|
      'press_parameter_96'|
      'press_parameter_97'|
      'press_parameter_98'|
      'press_parameter_99'|
      'press_parameter_100'|
      'press_parameter_101'|
      'press_parameter_102'|
      'press_parameter_103'|
      'press_parameter_104'|
      'press_parameter_105'|
      'press_parameter_106'|
      'press_parameter_107'|
      'press_parameter_108'|
      'press_parameter_109'|
      'press_parameter_110'|
      'press_parameter_111'|
      'press_parameter_112'|
      'press_parameter_113'|
      'press_parameter_114'|
      'press_parameter_115'|
      'press_parameter_116'|
      'press_parameter_117'|
      'press_parameter_118'|
      'press_parameter_119'|
      'press_parameter_120'|
      'press_parameter_121'|
      'press_parameter_122'|
      'press_parameter_123'|
      'press_parameter_124'|
      'press_parameter_125'|
      'press_parameter_126'|
      'press_parameter_127'|
      'press_parameter_128'|
      'press_parameter_129'|
      'press_parameter_130'|
      'press_parameter_131'|
      'press_parameter_132'|
      'press_parameter_133'|
      'press_parameter_134'|
      'press_parameter_135'|
      'press_parameter_136'|
      'press_parameter_137'|
      'press_parameter_138'|
      'press_parameter_139'|
      'press_parameter_140'|
      'press_parameter_141'|
      'press_parameter_142'|
      'press_parameter_143'|
      'press_parameter_144'|
      'press_parameter_145'|
      'press_parameter_146'|
      'press_parameter_147'|
      'press_parameter_148'|
      'press_parameter_149'|
      'press_parameter_150'|
      'press_parameter_151'|
      'press_parameter_152'|
      'press_parameter_153'|
      'press_parameter_154'|
      'press_parameter_155'|
      'press_parameter_156'|
      'press_parameter_157'|
      'press_parameter_158'|
      'press_parameter_159'|
      'press_parameter_160'|
      'press_parameter_161'|
      'press_parameter_162'|
      'press_parameter_163'|
      'press_parameter_164'|
      'press_parameter_165'|
      'press_parameter_166'|
      'press_parameter_167'|
      'press_parameter_168'|
      'press_parameter_169'|
      'press_parameter_170'|
      'press_parameter_171'|
      'press_parameter_172'|
      'press_parameter_173'|
      'press_parameter_174'|
      'press_parameter_175'|
      'press_parameter_176'|
      'press_parameter_177'|
      'press_parameter_178'|
      'press_parameter_179'|
      'press_parameter_180'|
      'press_parameter_181'|
      'press_parameter_182'|
      'press_parameter_183'|
      'press_parameter_184'|
      'press_parameter_185'|
      'press_parameter_186'|
      'press_parameter_187'|
      'press_parameter_188'|
      'press_parameter_189'|
      'press_parameter_190'|
      'press_parameter_191'|
      'press_parameter_192'|
      'press_parameter_193'|
      'press_parameter_194'|
      'press_parameter_195'|
      'press_parameter_196'|
      'press_parameter_197'|
      'press_parameter_198'|
      'press_parameter_199'

  //type 3
  export type InfluxCamField =
      'manufacturer'|
      'version'|
      'protocol_type'|
      'machine_code'|
      'flag_count'|
      'press_out_cam_0_on'|
      'press_out_cam_0_off'|
      'press_out_cam_1_on'|
      'press_out_cam_1_off'|
      'press_out_cam_2_on'|
      'press_out_cam_2_off'|
      'press_out_cam_3_on'|
      'press_out_cam_3_off'|
      'press_out_cam_4_on'|
      'press_out_cam_4_off'|
      'press_out_cam_5_on'|
      'press_out_cam_5_off'|
      'press_out_cam_6_on'|
      'press_out_cam_6_off'|
      'press_out_cam_7_on'|
      'press_out_cam_7_off'|
      'press_out_cam_8_on'|
      'press_out_cam_8_off'|
      'press_out_cam_9_off'|
      'press_out_cam_10_on'|
      'press_out_cam_10_off'|
      'press_out_cam_11_on'|
      'press_out_cam_11_off'|
      'press_out_cam_12_on'|
      'press_out_cam_12_off'|
      'press_out_cam_13_on'|
      'press_out_cam_13_off'|
      'press_out_cam_14_on'|
      'press_out_cam_14_off'|
      'press_out_cam_15_on'|
      'press_out_cam_15_off'|
      'press_out_cam_16_on'|
      'press_out_cam_16_off'|
      'press_out_cam_17_on'|
      'press_out_cam_17_off'|
      'press_out_cam_18_on'|
      'press_out_cam_18_off'|
      'press_out_cam_19_on'|
      'press_out_cam_19_off'|
      'press_out_cam_20_on'|
      'press_out_cam_20_off'|
      'press_out_cam_21_on'|
      'press_out_cam_21_off'|
      'press_out_cam_22_on'|
      'press_out_cam_22_off'|
      'press_out_cam_23_on'|
      'press_out_cam_23_off'|
      'press_out_cam_24_on'|
      'press_out_cam_24_off'|
      'press_out_cam_25_on'|
      'press_out_cam_25_off'|
      'press_out_cam_26_on'|
      'press_out_cam_26_off'|
      'press_out_cam_27_on'|
      'press_out_cam_27_off'|
      'press_out_cam_28_on'|
      'press_out_cam_28_off'|
      'press_out_cam_29_on'|
      'press_out_cam_29_off'|
      'press_out_cam_30_on'|
      'press_out_cam_30_off'|
      'press_out_cam_31_on'|
      'press_out_cam_31_off'|
      'press_out_cam_32_on'|
      'press_out_cam_32_off'|
      'press_out_cam_33_on'|
      'press_out_cam_33_off'|
      'press_out_cam_34_on'|
      'press_out_cam_34_off'|
      'press_out_cam_35_on'|
      'press_out_cam_35_off'|
      'press_out_cam_36_on'|
      'press_out_cam_36_off'|
      'press_out_cam_37_on'|
      'press_out_cam_37_off'|
      'press_out_cam_38_on'|
      'press_out_cam_38_off'|
      'press_out_cam_39_on'|
      'press_out_cam_39_off'|
      'press_out_cam_40_on'|
      'press_out_cam_40_off'|
      'press_out_cam_41_on'|
      'press_out_cam_41_off'|
      'press_out_cam_42_on'|
      'press_out_cam_42_off'|
      'press_out_cam_43_on'|
      'press_out_cam_43_off'|
      'press_out_cam_44_on'|
      'press_out_cam_44_off'|
      'press_out_cam_45_on'|
      'press_out_cam_45_off'|
      'press_out_cam_46_on'|
      'press_out_cam_46_off'|
      'press_out_cam_47_on'|
      'press_out_cam_47_off'|
      'press_out_cam_48_on'|
      'press_out_cam_48_off'|
      'press_out_cam_49_on'|
      'press_out_cam_49_off'|
      'press_out_cam_0_enable'|
      'press_out_cam_0_fen'|
      'press_out_cam_1_enable'|
      'press_out_cam_1_fen'|
      'press_out_cam_2_enable'|
      'press_out_cam_2_fen'|
      'press_out_cam_3_enable'|
      'press_out_cam_3_fen'|
      'press_out_cam_4_enable'|
      'press_out_cam_4_fen'|
      'press_out_cam_5_enable'|
      'press_out_cam_5_fen'|
      'press_out_cam_6_enable'|
      'press_out_cam_6_fen'|
      'press_out_cam_7_enable'|
      'press_out_cam_7_fen'|
      'press_out_cam_8_enable'|
      'press_out_cam_8_fen'|
      'press_out_cam_9_enable'|
      'press_out_cam_9_fen'|
      'press_out_cam_10_enable'|
      'press_out_cam_10_fen'|
      'press_out_cam_11_enable'|
      'press_out_cam_11_fen'|
      'press_out_cam_12_enable'|
      'press_out_cam_12_fen'|
      'press_out_cam_13_enable'|
      'press_out_cam_13_fen'|
      'press_out_cam_14_enable'|
      'press_out_cam_14_fen'|
      'press_out_cam_15_enable'|
      'press_out_cam_15_fen'|
      'press_out_cam_16_enable'|
      'press_out_cam_16_fen'|
      'press_out_cam_17_enable'|
      'press_out_cam_17_fen'|
      'press_out_cam_18_enable'|
      'press_out_cam_18_fen'|
      'press_out_cam_19_enable'|
      'press_out_cam_19_fen'|
      'press_out_cam_20_enable'|
      'press_out_cam_20_fen'|
      'press_out_cam_21_enable'|
      'press_out_cam_21_fen'|
      'press_out_cam_22_enable'|
      'press_out_cam_22_fen'|
      'press_out_cam_23_enable'|
      'press_out_cam_23_fen'|
      'press_out_cam_24_enable'|
      'press_out_cam_24_fen'|
      'press_out_cam_25_enable'|
      'press_out_cam_25_fen'|
      'press_out_cam_26_enable'|
      'press_out_cam_26_fen'|
      'press_out_cam_27_enable'|
      'press_out_cam_27_fen'|
      'press_out_cam_28_enable'|
      'press_out_cam_28_fen'|
      'press_out_cam_29_enable'|
      'press_out_cam_29_fen'|
      'press_out_cam_30_enable'|
      'press_out_cam_30_fen'|
      'press_out_cam_31_enable'|
      'press_out_cam_31_fen'|
      'press_out_cam_32_enable'|
      'press_out_cam_32_fen'|
      'press_out_cam_33_enable'|
      'press_out_cam_33_fen'|
      'press_out_cam_34_enable'|
      'press_out_cam_34_fen'|
      'press_out_cam_35_enable'|
      'press_out_cam_35_fen'|
      'press_out_cam_36_enable'|
      'press_out_cam_36_fen'|
      'press_out_cam_37_enable'|
      'press_out_cam_37_fen'|
      'press_out_cam_38_enable'|
      'press_out_cam_38_fen'|
      'press_out_cam_39_enable'|
      'press_out_cam_39_fen'|
      'press_out_cam_40_enable'|
      'press_out_cam_40_fen'|
      'press_out_cam_41_enable'|
      'press_out_cam_41_fen'|
      'press_out_cam_42_enable'|
      'press_out_cam_42_fen'|
      'press_out_cam_43_enable'|
      'press_out_cam_43_fen'|
      'press_out_cam_44_enable'|
      'press_out_cam_44_fen'|
      'press_out_cam_45_enable'|
      'press_out_cam_45_fen'|
      'press_out_cam_46_enable'|
      'press_out_cam_46_fen'|
      'press_out_cam_47_enable'|
      'press_out_cam_47_fen'|
      'press_out_cam_48_enable'|
      'press_out_cam_48_fen'|
      'press_out_cam_49_enable'|
      'press_out_cam_49_fen'|
      'press_out_cam_0_state'|
      'press_out_cam_1_state'|
      'press_out_cam_2_state'|
      'press_out_cam_3_state'|
      'press_out_cam_4_state'|
      'press_out_cam_5_state'|
      'press_out_cam_6_state'|
      'press_out_cam_7_state'|
      'press_out_cam_8_state'|
      'press_out_cam_9_state'|
      'press_out_cam_10_state'|
      'press_out_cam_11_state'|
      'press_out_cam_12_state'|
      'press_out_cam_13_state'|
      'press_out_cam_14_state'|
      'press_out_cam_15_state'|
      'press_out_cam_16_state'|
      'press_out_cam_17_state'|
      'press_out_cam_18_state'|
      'press_out_cam_19_state'|
      'press_out_cam_20_state'|
      'press_out_cam_21_state'|
      'press_out_cam_22_state'|
      'press_out_cam_23_state'|
      'press_out_cam_24_state'|
      'press_out_cam_25_state'|
      'press_out_cam_26_state'|
      'press_out_cam_27_state'|
      'press_out_cam_28_state'|
      'press_out_cam_29_state'|
      'press_out_cam_30_state'|
      'press_out_cam_31_state'|
      'press_out_cam_32_state'|
      'press_out_cam_33_state'|
      'press_out_cam_34_state'|
      'press_out_cam_35_state'|
      'press_out_cam_36_state'|
      'press_out_cam_37_state'|
      'press_out_cam_38_state'|
      'press_out_cam_39_state'|
      'press_out_cam_40_state'|
      'press_out_cam_41_state'|
      'press_out_cam_42_state'|
      'press_out_cam_43_state'|
      'press_out_cam_44_state'|
      'press_out_cam_45_state'|
      'press_out_cam_46_state'|
      'press_out_cam_47_state'|
      'press_out_cam_48_state'|
      'press_out_cam_49_state'

  //type 4
  export type InfluxSlideField =
      'manufacturer'|
      'version'|
      'flag_count'|
      'slide_position_setting_0'|
      'slide_position_setting_1'|
      'slide_position_setting_2'|
      'slide_position_setting_3'|
      'slide_position_setting_4'|
      'slide_position_setting_5'|
      'slide_position_setting_6'|
      'slide_position_setting_7'|
      'slide_position_setting_8'|
      'slide_position_setting_9'|
      'slide_position_setting_10'|
      'slide_position_setting_11'|
      'slide_position_setting_12'|
      'slide_position_setting_13'|
      'slide_position_setting_14'|
      'slide_position_setting_15'|
      'slide_position_setting_16'|
      'slide_position_setting_17'|
      'slide_position_setting_18'|
      'slide_position_setting_19'|
      'slide_position_setting_20'|
      'slide_position_setting_21'|
      'slide_position_setting_22'|
      'slide_position_setting_23'|
      'slide_position_setting_24'|
      'slide_position_setting_25'|
      'slide_position_setting_26'|
      'slide_position_setting_27'|
      'slide_position_setting_28'|
      'slide_position_setting_29'|
      'slide_position_setting_30'|
      'slide_position_setting_31'|
      'slide_position_setting_32'|
      'slide_position_setting_33'|
      'slide_position_setting_34'|
      'slide_position_setting_35'|
      'slide_position_setting_36'|
      'slide_position_setting_37'|
      'slide_position_setting_38'|
      'slide_position_setting_39'|
      'slide_position_setting_40'|
      'slide_position_setting_41'|
      'slide_position_setting_42'|
      'slide_position_setting_43'|
      'slide_position_setting_44'|
      'slide_position_setting_45'|
      'slide_position_setting_46'|
      'slide_position_setting_47'|
      'slide_position_setting_48'|
      'slide_position_setting_49'|
      'slide_position_setting_50'|
      'slide_position_setting_51'|
      'slide_position_setting_52'|
      'slide_position_setting_53'|
      'slide_position_setting_54'|
      'slide_position_setting_55'|
      'slide_position_setting_56'|
      'slide_position_setting_57'|
      'slide_position_setting_58'|
      'slide_position_setting_59'|
      'slide_position_setting_60'|
      'slide_position_setting_61'|
      'slide_position_setting_62'|
      'slide_position_setting_63'|
      'slide_position_setting_64'|
      'slide_position_setting_65'|
      'slide_position_setting_66'|
      'slide_position_setting_67'|
      'slide_position_setting_68'|
      'slide_position_setting_69'|
      'slide_position_setting_70'|
      'slide_position_setting_71'|
      'slide_position_setting_72'|
      'slide_position_setting_73'|
      'slide_position_setting_74'|
      'slide_position_setting_75'|
      'slide_position_setting_76'|
      'slide_position_setting_77'|
      'slide_position_setting_78'|
      'slide_position_setting_79'|
      'slide_position_setting_80'|
      'slide_position_setting_81'|
      'slide_position_setting_82'|
      'slide_position_setting_83'|
      'slide_position_setting_84'|
      'slide_position_setting_85'|
      'slide_position_setting_86'|
      'slide_position_setting_87'|
      'slide_position_setting_88'|
      'slide_position_setting_89'|
      'slide_position_setting_90'|
      'slide_position_setting_91'|
      'slide_position_setting_92'|
      'slide_position_setting_93'|
      'slide_position_setting_94'|
      'slide_position_setting_95'|
      'slide_position_setting_96'|
      'slide_position_setting_97'|
      'slide_position_setting_98'|
      'slide_position_high_limit'|
      'slide_position_low_limit'|
      'slide_position_diff'|
      'slide_position_current'|
      'slide_position_num'|
      'slide_position_state'|
      'slide_position_mode'

  export interface InfluxTagData{
    'machine_code':string, // 기계 p넘버
    'protocol_type':number
  }

  export interface InfluxPressData {
    // [InfluxCamField]: InfluxDataType
    'manufacturer': string, // 제조사
    'version': number, // 기계 버전
    'press_spm': number, // 분당 회전 수
    'press_angle': number, // 각도
    'press_main_motor_current': number, // 메인 모터 전류, f
    'press_slide_motor_current': number, // 슬라이드 모터 전류, f
    'press_inverter_spm': number, // 인버터
    'press_preset_counter': number, // 프리셋 카운터(셋팅 카운터)
    'press_total_counter': number, // 전원 켜진 이후 토탈 카운터
    'press_whole_counter': number, // 기계 전체 카운터
    'press_preset_limit_counter': number, // 셋팅 최대 카운터
    'cycle_index': number, // 행정 인덱스
    'press_temperature_value_1': number, // 온도 센서 1 값
    'press_temperature_value_2': number,
    'press_temperature_value_3': number,
    'press_temperature_value_4': number,
    'press_temperature_value_5': number,
    'press_temperature_value_6': number,
    'press_temperature_value_7': number,
    'press_temperature_value_8': number,
    'press_safety_one_cycle_stop_angle': number, // 클러치 정지 각도, f
    'press_safety_one_cycle_slip_angle': number, // 클러치 밀림 각도, f
    'press_key_cam': number, // 키캠 상태
    'press_run_ready': number, // 운전 준비 완료
    'press_run_ok': number, // 가동 준비 완료
    'press_motor_state': number, // 모터 상태
    'press_motor_vector': number, // 모터 방향
    'press_run_state': number, // 운전 중 상태
    'press_error_number': number, //에러 값 ( 코드)
    'press_slide_top_position': number, // 슬라이드 최대 높이, f
    'press_operator_run_time': string, // 가동시간 "01:00:01"
    'press_operator_stop_time': string, // 비가동시간
    'press_operator_run_ms': number, // ex> 67
    'press_operator_stop_ms': number,
    'press_in_1': number, // 입력장치 1번
    'press_in_2': number,
    'press_in_3': number,
    'press_in_4': number,
    'press_in_5': number,
    'press_in_6': number,
    'press_in_7': number,
    'press_in_8': number,
    'press_in_9': number,
    'press_in_10': number,
    'press_in_11': number,
    'press_in_12': number,
    'press_in_13': number,
    'press_in_14': number,
    'press_in_15': number,
    'press_in_16': number,
    'press_in_17': number,
    'press_in_18': number,
    'press_in_19': number,
    'press_in_20': number,
    'press_in_21': number,
    'press_in_22': number,
    'press_in_23': number,
    'press_in_24': number,
    'press_in_25': number,
    'press_in_26': number,
    'press_in_27': number,
    'press_in_28': number,
    'press_in_29': number,
    'press_in_30': number,
    'press_in_31': number,
    'press_in_32': number,
    'press_in_33': number,
    'press_in_34': number,
    'press_in_35': number,
    'press_in_36': number,
    'press_in_37': number,
    'press_in_38': number,
    'press_out_1': number, //출력 장치 1번
    'press_out_2': number,
    'press_out_3': number,
    'press_out_4': number,
    'press_out_5': number,
    'press_out_6': number,
    'press_out_7': number,
    'press_out_8': number,
    'press_out_9': number,
    'press_out_10': number,
    'press_out_11': number,
    'press_out_12': number,
    'press_out_13': number,
    'press_out_14': number,
    'press_out_15': number,
    'press_out_16': number,
    'press_out_17': number,
    'press_out_18': number,
    'press_out_19': number,
    'press_out_20': number,
    'press_out_21': number,
    'press_out_22': number,
    'press_out_23': number,
    'press_out_24': number,
    'press_out_25': number,
    'press_out_26': number,
    'press_out_27': number,
    'press_out_28': number,
    'press_out_29': number,
    'press_error_state_1': number, //error 1번 on/off
    'press_error_state_2': number,
    'press_error_state_3': number,
    'press_error_state_4': number,
    'press_error_state_5': number,
    'press_error_state_6': number,
    'press_error_state_7': number,
    'press_error_state_8': number,
    'press_error_state_9': number,
    'press_error_state_10': number,
    'press_error_state_11': number,
    'press_error_state_12': number,
    'press_error_state_13': number,
    'press_error_state_14': number,
    'press_error_state_15': number,
    'press_error_state_16': number,
    'press_error_state_17': number,
    'press_error_state_18': number,
    'press_error_state_19': number,
    'press_error_state_20': number,
    'press_error_state_21': number,
    'press_error_state_22': number,
    'press_error_state_23': number,
    'press_error_state_24': number,
    'press_error_state_25': number,
    'press_error_state_26': number,
    'press_error_state_27': number,
    'press_error_state_28': number,
    'press_error_state_29': number,
    'press_error_state_30': number,
    'press_error_state_31': number,
    'press_error_state_32': number,
    'press_error_state_33': number,
    'press_error_state_34': number,
    'press_error_state_35': number,
    'press_error_state_36': number,
    'press_error_state_37': number,
    'press_error_state_38': number,
    'press_error_state_39': number,
    'press_error_state_40': number,
    'press_error_state_41': number,
    'press_error_state_42': number,
    'press_error_state_43': number,
    'press_error_state_44': number,
    'press_error_state_45': number,
    'press_error_state_46': number,
    'press_error_state_47': number,
    'press_error_state_48': number,
    'press_error_state_49': number,
    'press_error_state_50': number,
    'press_error_state_51': number,
    'press_error_state_52': number,
    'press_error_state_53': number,
    'press_error_state_54': number,
    'press_error_state_55': number,
    'press_error_state_56': number,
    'press_error_state_57': number,
    'press_error_state_58': number,
    'press_error_state_59': number,
    'press_error_state_60': number,
    'press_error_state_61': number,
    'press_error_state_62': number,
    'press_error_state_63': number,
    'press_error_state_64': number,
    'press_error_state_65': number,
    'press_error_state_66': number,
    'press_error_state_67': number,
    'press_error_state_68': number,
    'press_error_state_69': number,
    'press_error_state_70': number,
    'press_error_state_71': number,
    'press_error_state_72': number,
    'press_error_state_73': number,
    'press_error_state_74': number,
    'press_error_state_75': number,
    'press_error_state_76': number,
    'press_error_state_77': number,
    'press_error_state_78': number,
    'press_error_state_79': number,
    'press_error_state_80': number,
    'press_error_state_81': number,
    'press_error_state_82': number,
    'press_error_state_83': number,
    'press_error_state_84': number,
    'press_error_state_85': number,
    'press_error_state_86': number,
    'press_error_state_87': number,
    'press_error_state_88': number,
    'press_error_state_89': number,
    'press_error_state_90': number,
    'press_error_state_91': number,
    'press_error_state_92': number,
    'press_error_state_93': number,
    'press_error_state_94': number,
    'press_error_state_95': number,
    'press_error_state_96': number,
    'press_error_state_97': number,
    'press_error_state_98': number,
    'press_error_state_99': number,
  }

  export interface InfluxPressMonData {
    'manufacturer': string, // 제조사
    'version': number, // 기계 버전
    'protocol_type':number, // 프로토콜 타입
    'flag_count': number, // 행정 인덱스
    'total_ton': number, // 실시간 톤수 값
    'total_ton_max': number, //행정에서 토탈톤 최대 값
    'total_ton_avg': number, // 행정에서 토탈 톤 평균
    'total_ton_sensor': number,
    'ch1_ton_sensor': number, // 채널 1 로드톤 평균 값
    'ch2_ton_sensor':number, // 채널 2 로드톤 평균 값
    '_ton_left_160': number, // 각도별 ch1 로드톤 값 _ton 은 전부 f
    '_ton_left_161': number,
    '_ton_left_162': number,
    '_ton_left_163': number,
    '_ton_left_164': number,
    '_ton_left_165': number,
    '_ton_left_166': number,
    '_ton_left_167': number,
    '_ton_left_168': number,
    '_ton_left_169': number,
    '_ton_left_170': number,
    '_ton_left_171': number,
    '_ton_left_172': number,
    '_ton_left_173': number,
    '_ton_left_174': number,
    '_ton_left_175': number,
    '_ton_left_176': number,
    '_ton_left_177': number,
    '_ton_left_178': number,
    '_ton_left_179': number,
    '_ton_left_180': number,
    '_ton_left_181': number,
    '_ton_left_182': number,
    '_ton_left_183': number,
    '_ton_left_184': number,
    '_ton_left_185': number,
    '_ton_left_186': number,
    '_ton_left_187': number,
    '_ton_left_188': number,
    '_ton_left_189': number,
    '_ton_left_190': number,
    '_ton_left_191': number,
    '_ton_left_192': number,
    '_ton_left_193': number,
    '_ton_left_194': number,
    '_ton_left_195': number,
    '_ton_left_196': number,
    '_ton_left_197': number,
    '_ton_left_198': number,
    '_ton_left_199': number,
    '_ton_left_200': number,
    '_ton_right_160': number, // ch2 각도별 로트톤 값
    '_ton_right_161': number,
    '_ton_right_162': number,
    '_ton_right_163': number,
    '_ton_right_164': number,
    '_ton_right_165': number,
    '_ton_right_166': number,
    '_ton_right_167': number,
    '_ton_right_168': number,
    '_ton_right_169': number,
    '_ton_right_170': number,
    '_ton_right_171': number,
    '_ton_right_172': number,
    '_ton_right_173': number,
    '_ton_right_174': number,
    '_ton_right_175': number,
    '_ton_right_176': number,
    '_ton_right_177': number,
    '_ton_right_178': number,
    '_ton_right_179': number,
    '_ton_right_180': number,
    '_ton_right_181': number,
    '_ton_right_182': number,
    '_ton_right_183': number,
    '_ton_right_184': number,
    '_ton_right_185': number,
    '_ton_right_186': number,
    '_ton_right_187': number,
    '_ton_right_188': number,
    '_ton_right_189': number,
    '_ton_right_190': number,
    '_ton_right_191': number,
    '_ton_right_192': number,
    '_ton_right_193': number,
    '_ton_right_194': number,
    '_ton_right_195': number,
    '_ton_right_196': number,
    '_ton_right_197': number,
    '_ton_right_198': number,
    '_ton_right_199': number,
    '_ton_right_200': number,
    'load_energy': number // 일량
  }

  export interface InfluxParamData {
    'manufacturer': string, // 제조사
    'version': number, // 버전
    'flag_count': number, // 행정 인덱스
    'length': number,
    'press_parameter_0': number, // 세팅 파라미터 0번
    'press_parameter_1': number,
    'press_parameter_2': number,
    'press_parameter_3': number,
    'press_parameter_4': number,
    'press_parameter_5': number,
    'press_parameter_6': number,
    'press_parameter_7': number,
    'press_parameter_8': number,
    'press_parameter_9': number,
    'press_parameter_10': number,
    'press_parameter_11': number,
    'press_parameter_12': number,
    'press_parameter_13': number,
    'press_parameter_14': number,
    'press_parameter_15': number,
    'press_parameter_16': number,
    'press_parameter_17': number,
    'press_parameter_18': number,
    'press_parameter_19': number,
    'press_parameter_20': number,
    'press_parameter_21': number,
    'press_parameter_22': number,
    'press_parameter_23': number,
    'press_parameter_24': number,
    'press_parameter_25': number,
    'press_parameter_26': number,
    'press_parameter_27': number,
    'press_parameter_28': number,
    'press_parameter_29': number,
    'press_parameter_30': number,
    'press_parameter_31': number,
    'press_parameter_32': number,
    'press_parameter_33': number,
    'press_parameter_34': number,
    'press_parameter_35': number,
    'press_parameter_36': number,
    'press_parameter_37': number,
    'press_parameter_38': number,
    'press_parameter_39': number,
    'press_parameter_40': number,
    'press_parameter_41': number,
    'press_parameter_42': number,
    'press_parameter_43': number,
    'press_parameter_44': number,
    'press_parameter_45': number,
    'press_parameter_46': number,
    'press_parameter_47': number,
    'press_parameter_48': number,
    'press_parameter_49': number,
    'press_parameter_50': number,
    'press_parameter_51': number,
    'press_parameter_52': number,
    'press_parameter_53': number,
    'press_parameter_54': number,
    'press_parameter_55': number,
    'press_parameter_56': number,
    'press_parameter_57': number,
    'press_parameter_58': number,
    'press_parameter_59': number,
    'press_parameter_60': number,
    'press_parameter_61': number,
    'press_parameter_62': number,
    'press_parameter_63': number,
    'press_parameter_64': number,
    'press_parameter_65': number,
    'press_parameter_66': number,
    'press_parameter_67': number,
    'press_parameter_68': number,
    'press_parameter_69': number,
    'press_parameter_70': number,
    'press_parameter_71': number,
    'press_parameter_72': number,
    'press_parameter_73': number,
    'press_parameter_74': number,
    'press_parameter_75': number,
    'press_parameter_76': number,
    'press_parameter_77': number,
    'press_parameter_78': number,
    'press_parameter_79': number,
    'press_parameter_80': number,
    'press_parameter_81': number,
    'press_parameter_82': number,
    'press_parameter_83': number,
    'press_parameter_84': number,
    'press_parameter_85': number,
    'press_parameter_86': number,
    'press_parameter_87': number,
    'press_parameter_88': number,
    'press_parameter_89': number,
    'press_parameter_90': number,
    'press_parameter_91': number,
    'press_parameter_92': number,
    'press_parameter_93': number,
    'press_parameter_94': number,
    'press_parameter_95': number,
    'press_parameter_96': number,
    'press_parameter_97': number,
    'press_parameter_98': number,
    'press_parameter_99': number,
    'press_parameter_100': number,
    'press_parameter_101': number,
    'press_parameter_102': number,
    'press_parameter_103': number,
    'press_parameter_104': number,
    'press_parameter_105': number,
    'press_parameter_106': number,
    'press_parameter_107': number,
    'press_parameter_108': number,
    'press_parameter_109': number,
    'press_parameter_110': number,
    'press_parameter_111': number,
    'press_parameter_112': number,
    'press_parameter_113': number,
    'press_parameter_114': number,
    'press_parameter_115': number,
    'press_parameter_116': number,
    'press_parameter_117': number,
    'press_parameter_118': number,
    'press_parameter_119': number,
    'press_parameter_120': number,
    'press_parameter_121': number,
    'press_parameter_122': number,
    'press_parameter_123': number,
    'press_parameter_124': number,
    'press_parameter_125': number,
    'press_parameter_126': number,
    'press_parameter_127': number,
    'press_parameter_128': number,
    'press_parameter_129': number,
    'press_parameter_130': number,
    'press_parameter_131': number,
    'press_parameter_132': number,
    'press_parameter_133': number,
    'press_parameter_134': number,
    'press_parameter_135': number,
    'press_parameter_136': number,
    'press_parameter_137': number,
    'press_parameter_138': number,
    'press_parameter_139': number,
    'press_parameter_140': number,
    'press_parameter_141': number,
    'press_parameter_142': number,
    'press_parameter_143': number,
    'press_parameter_144': number,
    'press_parameter_145': number,
    'press_parameter_146': number,
    'press_parameter_147': number,
    'press_parameter_148': number,
    'press_parameter_149': number,
    'press_parameter_150': number,
    'press_parameter_151': number,
    'press_parameter_152': number,
    'press_parameter_153': number,
    'press_parameter_154': number,
    'press_parameter_155': number,
    'press_parameter_156': number,
    'press_parameter_157': number,
    'press_parameter_158': number,
    'press_parameter_159': number,
    'press_parameter_160': number,
    'press_parameter_161': number,
    'press_parameter_162': number,
    'press_parameter_163': number,
    'press_parameter_164': number,
    'press_parameter_165': number,
    'press_parameter_166': number,
    'press_parameter_167': number,
    'press_parameter_168': number,
    'press_parameter_169': number,
    'press_parameter_170': number,
    'press_parameter_171': number,
    'press_parameter_172': number,
    'press_parameter_173': number,
    'press_parameter_174': number,
    'press_parameter_175': number,
    'press_parameter_176': number,
    'press_parameter_177': number,
    'press_parameter_178': number,
    'press_parameter_179': number,
    'press_parameter_180': number,
    'press_parameter_181': number,
    'press_parameter_182': number,
    'press_parameter_183': number,
    'press_parameter_184': number,
    'press_parameter_185': number,
    'press_parameter_186': number,
    'press_parameter_187': number,
    'press_parameter_188': number,
    'press_parameter_189': number,
    'press_parameter_190': number,
    'press_parameter_191': number,
    'press_parameter_192': number,
    'press_parameter_193': number,
    'press_parameter_194': number,
    'press_parameter_195': number,
    'press_parameter_196': number,
    'press_parameter_197': number,
    'press_parameter_198': number,
    'press_parameter_199': number
  }

  export interface InfluxCamData {
    'manufacturer': string, // 제조사
    'version': number, // 버전
    'flag_count': number, // 행정 인덱스
    'length':number,
    'press_out_cam_0_on': number, // 출력캠 0번 on 각도
    'press_out_cam_0_off': number,  // 출력캠 0번 off 각도
    'press_out_cam_1_on': number,
    'press_out_cam_1_off': number,
    'press_out_cam_2_on': number,
    'press_out_cam_2_off': number,
    'press_out_cam_3_on': number,
    'press_out_cam_3_off': number,
    'press_out_cam_4_on': number,
    'press_out_cam_4_off': number,
    'press_out_cam_5_on': number,
    'press_out_cam_5_off': number,
    'press_out_cam_6_on': number,
    'press_out_cam_6_off': number,
    'press_out_cam_7_on': number,
    'press_out_cam_7_off': number,
    'press_out_cam_8_on': number,
    'press_out_cam_8_off': number,
    'press_out_cam_9_off': number,
    'press_out_cam_10_on': number,
    'press_out_cam_10_off': number,
    'press_out_cam_11_on': number,
    'press_out_cam_11_off': number,
    'press_out_cam_12_on': number,
    'press_out_cam_12_off': number,
    'press_out_cam_13_on': number,
    'press_out_cam_13_off': number,
    'press_out_cam_14_on': number,
    'press_out_cam_14_off': number,
    'press_out_cam_15_on': number,
    'press_out_cam_15_off': number,
    'press_out_cam_16_on': number,
    'press_out_cam_16_off': number,
    'press_out_cam_17_on': number,
    'press_out_cam_17_off': number,
    'press_out_cam_18_on': number,
    'press_out_cam_18_off': number,
    'press_out_cam_19_on': number,
    'press_out_cam_19_off': number,
    'press_out_cam_20_on': number,
    'press_out_cam_20_off': number,
    'press_out_cam_21_on': number,
    'press_out_cam_21_off': number,
    'press_out_cam_22_on': number,
    'press_out_cam_22_off': number,
    'press_out_cam_23_on': number,
    'press_out_cam_23_off': number,
    'press_out_cam_24_on': number,
    'press_out_cam_24_off': number,
    'press_out_cam_25_on': number,
    'press_out_cam_25_off': number,
    'press_out_cam_26_on': number,
    'press_out_cam_26_off': number,
    'press_out_cam_27_on': number,
    'press_out_cam_27_off': number,
    'press_out_cam_28_on': number,
    'press_out_cam_28_off': number,
    'press_out_cam_29_on': number,
    'press_out_cam_29_off': number,
    'press_out_cam_30_on': number,
    'press_out_cam_30_off': number,
    'press_out_cam_31_on': number,
    'press_out_cam_31_off': number,
    'press_out_cam_32_on': number,
    'press_out_cam_32_off': number,
    'press_out_cam_33_on': number,
    'press_out_cam_33_off': number,
    'press_out_cam_34_on': number,
    'press_out_cam_34_off': number,
    'press_out_cam_35_on': number,
    'press_out_cam_35_off': number,
    'press_out_cam_36_on': number,
    'press_out_cam_36_off': number,
    'press_out_cam_37_on': number,
    'press_out_cam_37_off': number,
    'press_out_cam_38_on': number,
    'press_out_cam_38_off': number,
    'press_out_cam_39_on': number,
    'press_out_cam_39_off': number,
    'press_out_cam_40_on': number,
    'press_out_cam_40_off': number,
    'press_out_cam_41_on': number,
    'press_out_cam_41_off': number,
    'press_out_cam_42_on': number,
    'press_out_cam_42_off': number,
    'press_out_cam_43_on': number,
    'press_out_cam_43_off': number,
    'press_out_cam_44_on': number,
    'press_out_cam_44_off': number,
    'press_out_cam_45_on': number,
    'press_out_cam_45_off': number,
    'press_out_cam_46_on': number,
    'press_out_cam_46_off': number,
    'press_out_cam_47_on': number,
    'press_out_cam_47_off': number,
    'press_out_cam_48_on': number,
    'press_out_cam_48_off': number,
    'press_out_cam_49_on': number,
    'press_out_cam_49_off': number,
    'press_out_cam_0_enable': number, // 출력캠 0번 onoff 상태(활성화 되어있는지? 사용하는지..?)
    'press_out_cam_0_fen': number, // ,,??
    'press_out_cam_1_enable': number,
    'press_out_cam_1_fen': number,
    'press_out_cam_2_enable': number,
    'press_out_cam_2_fen': number,
    'press_out_cam_3_enable': number,
    'press_out_cam_3_fen': number,
    'press_out_cam_4_enable': number,
    'press_out_cam_4_fen': number,
    'press_out_cam_5_enable': number,
    'press_out_cam_5_fen': number,
    'press_out_cam_6_enable': number,
    'press_out_cam_6_fen': number,
    'press_out_cam_7_enable': number,
    'press_out_cam_7_fen': number,
    'press_out_cam_8_enable': number,
    'press_out_cam_8_fen': number,
    'press_out_cam_9_enable': number,
    'press_out_cam_9_fen': number,
    'press_out_cam_10_enable': number,
    'press_out_cam_10_fen': number,
    'press_out_cam_11_enable': number,
    'press_out_cam_11_fen': number,
    'press_out_cam_12_enable': number,
    'press_out_cam_12_fen': number,
    'press_out_cam_13_enable': number,
    'press_out_cam_13_fen': number,
    'press_out_cam_14_enable': number,
    'press_out_cam_14_fen': number,
    'press_out_cam_15_enable': number,
    'press_out_cam_15_fen': number,
    'press_out_cam_16_enable': number,
    'press_out_cam_16_fen': number,
    'press_out_cam_17_enable': number,
    'press_out_cam_17_fen': number,
    'press_out_cam_18_enable': number,
    'press_out_cam_18_fen': number,
    'press_out_cam_19_enable': number,
    'press_out_cam_19_fen': number,
    'press_out_cam_20_enable': number,
    'press_out_cam_20_fen': number,
    'press_out_cam_21_enable': number,
    'press_out_cam_21_fen': number,
    'press_out_cam_22_enable': number,
    'press_out_cam_22_fen': number,
    'press_out_cam_23_enable': number,
    'press_out_cam_23_fen': number,
    'press_out_cam_24_enable': number,
    'press_out_cam_24_fen': number,
    'press_out_cam_25_enable': number,
    'press_out_cam_25_fen': number,
    'press_out_cam_26_enable': number,
    'press_out_cam_26_fen': number,
    'press_out_cam_27_enable': number,
    'press_out_cam_27_fen': number,
    'press_out_cam_28_enable': number,
    'press_out_cam_28_fen': number,
    'press_out_cam_29_enable': number,
    'press_out_cam_29_fen': number,
    'press_out_cam_30_enable': number,
    'press_out_cam_30_fen': number,
    'press_out_cam_31_enable': number,
    'press_out_cam_31_fen': number,
    'press_out_cam_32_enable': number,
    'press_out_cam_32_fen': number,
    'press_out_cam_33_enable': number,
    'press_out_cam_33_fen': number,
    'press_out_cam_34_enable': number,
    'press_out_cam_34_fen': number,
    'press_out_cam_35_enable': number,
    'press_out_cam_35_fen': number,
    'press_out_cam_36_enable': number,
    'press_out_cam_36_fen': number,
    'press_out_cam_37_enable': number,
    'press_out_cam_37_fen': number,
    'press_out_cam_38_enable': number,
    'press_out_cam_38_fen': number,
    'press_out_cam_39_enable': number,
    'press_out_cam_39_fen': number,
    'press_out_cam_40_enable': number,
    'press_out_cam_40_fen': number,
    'press_out_cam_41_enable': number,
    'press_out_cam_41_fen': number,
    'press_out_cam_42_enable': number,
    'press_out_cam_42_fen': number,
    'press_out_cam_43_enable': number,
    'press_out_cam_43_fen': number,
    'press_out_cam_44_enable': number,
    'press_out_cam_44_fen': number,
    'press_out_cam_45_enable': number,
    'press_out_cam_45_fen': number,
    'press_out_cam_46_enable': number,
    'press_out_cam_46_fen': number,
    'press_out_cam_47_enable': number,
    'press_out_cam_47_fen': number,
    'press_out_cam_48_enable': number,
    'press_out_cam_48_fen': number,
    'press_out_cam_49_enable': number,
    'press_out_cam_49_fen': number,
    'press_out_cam_0_state': number, // 프레스 출력 캠 0번 상태
    'press_out_cam_1_state': number,
    'press_out_cam_2_state': number,
    'press_out_cam_3_state': number,
    'press_out_cam_4_state': number,
    'press_out_cam_5_state': number,
    'press_out_cam_6_state': number,
    'press_out_cam_7_state': number,
    'press_out_cam_8_state': number,
    'press_out_cam_9_state': number,
    'press_out_cam_10_state': number,
    'press_out_cam_11_state': number,
    'press_out_cam_12_state': number,
    'press_out_cam_13_state': number,
    'press_out_cam_14_state': number,
    'press_out_cam_15_state': number,
    'press_out_cam_16_state': number,
    'press_out_cam_17_state': number,
    'press_out_cam_18_state': number,
    'press_out_cam_19_state': number,
    'press_out_cam_20_state': number,
    'press_out_cam_21_state': number,
    'press_out_cam_22_state': number,
    'press_out_cam_23_state': number,
    'press_out_cam_24_state': number,
    'press_out_cam_25_state': number,
    'press_out_cam_26_state': number,
    'press_out_cam_27_state': number,
    'press_out_cam_28_state': number,
    'press_out_cam_29_state': number,
    'press_out_cam_30_state': number,
    'press_out_cam_31_state': number,
    'press_out_cam_32_state': number,
    'press_out_cam_33_state': number,
    'press_out_cam_34_state': number,
    'press_out_cam_35_state': number,
    'press_out_cam_36_state': number,
    'press_out_cam_37_state': number,
    'press_out_cam_38_state': number,
    'press_out_cam_39_state': number,
    'press_out_cam_40_state': number,
    'press_out_cam_41_state': number,
    'press_out_cam_42_state': number,
    'press_out_cam_43_state': number,
    'press_out_cam_44_state': number,
    'press_out_cam_45_state': number,
    'press_out_cam_46_state': number,
    'press_out_cam_47_state': number,
    'press_out_cam_48_state': number,
    'press_out_cam_49_state': number,
  }

  export interface InfluxSlideData { // 사용하지 않고 있음
    'manufacturer':string, //제조사
    'version':number, //버전
    'protocol_type':number,//프로토콜 타입 4
    'flag_count':number,// 행정 인덱스
    'slide_position_setting_0':number,
    'slide_position_setting_1':number,
    'slide_position_setting_2':number,
    'slide_position_setting_3':number,
    'slide_position_setting_4':number,
    'slide_position_setting_5':number,
    'slide_position_setting_6':number,
    'slide_position_setting_7':number,
    'slide_position_setting_8':number,
    'slide_position_setting_9':number,
    'slide_position_setting_10':number,
    'slide_position_setting_11':number,
    'slide_position_setting_12':number,
    'slide_position_setting_13':number,
    'slide_position_setting_14':number,
    'slide_position_setting_15':number,
    'slide_position_setting_16':number,
    'slide_position_setting_17':number,
    'slide_position_setting_18':number,
    'slide_position_setting_19':number,
    'slide_position_setting_20':number,
    'slide_position_setting_21':number,
    'slide_position_setting_22':number,
    'slide_position_setting_23':number,
    'slide_position_setting_24':number,
    'slide_position_setting_25':number,
    'slide_position_setting_26':number,
    'slide_position_setting_27':number,
    'slide_position_setting_28':number,
    'slide_position_setting_29':number,
    'slide_position_setting_30':number,
    'slide_position_setting_31':number,
    'slide_position_setting_32':number,
    'slide_position_setting_33':number,
    'slide_position_setting_34':number,
    'slide_position_setting_35':number,
    'slide_position_setting_36':number,
    'slide_position_setting_37':number,
    'slide_position_setting_38':number,
    'slide_position_setting_39':number,
    'slide_position_setting_40':number,
    'slide_position_setting_41':number,
    'slide_position_setting_42':number,
    'slide_position_setting_43':number,
    'slide_position_setting_44':number,
    'slide_position_setting_45':number,
    'slide_position_setting_46':number,
    'slide_position_setting_47':number,
    'slide_position_setting_48':number,
    'slide_position_setting_49':number,
    'slide_position_setting_50':number,
    'slide_position_setting_51':number,
    'slide_position_setting_52':number,
    'slide_position_setting_53':number,
    'slide_position_setting_54':number,
    'slide_position_setting_55':number,
    'slide_position_setting_56':number,
    'slide_position_setting_57':number,
    'slide_position_setting_58':number,
    'slide_position_setting_59':number,
    'slide_position_setting_60':number,
    'slide_position_setting_61':number,
    'slide_position_setting_62':number,
    'slide_position_setting_63':number,
    'slide_position_setting_64':number,
    'slide_position_setting_65':number,
    'slide_position_setting_66':number,
    'slide_position_setting_67':number,
    'slide_position_setting_68':number,
    'slide_position_setting_69':number,
    'slide_position_setting_70':number,
    'slide_position_setting_71':number,
    'slide_position_setting_72':number,
    'slide_position_setting_73':number,
    'slide_position_setting_74':number,
    'slide_position_setting_75':number,
    'slide_position_setting_76':number,
    'slide_position_setting_77':number,
    'slide_position_setting_78':number,
    'slide_position_setting_79':number,
    'slide_position_setting_80':number,
    'slide_position_setting_81':number,
    'slide_position_setting_82':number,
    'slide_position_setting_83':number,
    'slide_position_setting_84':number,
    'slide_position_setting_85':number,
    'slide_position_setting_86':number,
    'slide_position_setting_87':number,
    'slide_position_setting_88':number,
    'slide_position_setting_89':number,
    'slide_position_setting_90':number,
    'slide_position_setting_91':number,
    'slide_position_setting_92':number,
    'slide_position_setting_93':number,
    'slide_position_setting_94':number,
    'slide_position_setting_95':number,
    'slide_position_setting_96':number,
    'slide_position_setting_97':number,
    'slide_position_setting_98':number,
    'slide_position_high_limit':number,
    'slide_position_low_limit':number,
    'slide_position_diff':number,
    'slide_position_current':number,
    'slide_position_num':number,
    'slide_position_state':number,
    'slide_position_mode':number
  }
}