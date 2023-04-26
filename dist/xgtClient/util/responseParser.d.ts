/**
 * 응답 값을 분석하는 용도의 유틸리티 함수
 *
 * 들어온 응답값을 규칙에 따라 파싱해보고 파싱된 결과를 로깅함으로써 빨리 파악할 수 있도록
 * */
/// <reference types="node" />
import { XGTReadResponse } from 'XGTClient';
export declare function parseReadResponse(buf: Buffer): XGTReadResponse;
export declare function parseWriteResponse(buf: Buffer): void;
