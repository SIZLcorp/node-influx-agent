/**
 * 요청값이 잘 만들어졌는지 확인 등의 용도로 사용하는 유틸리티 함수
 *
 * 만들어진 요청값이 잘 만들어 진건지 규칙에 따라 파싱해보고 파싱된 결과를 로깅함으로써 빨리 파악할 수 있도록
 * */
/// <reference types="node" />
export declare function parseReadRequest(buf: Buffer): void;
export declare function parseWriteRequest(buf: Buffer): void;
