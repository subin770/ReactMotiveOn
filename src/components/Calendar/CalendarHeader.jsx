import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

class CalendarPage extends Component {
  state = {
    currentTitle: "",
  };

  touchStartX = 0;

  handleDatesSet = (info) => {
    const year = info.view.currentStart.getFullYear();
    const month = String(info.view.currentStart.getMonth() + 1).padStart(2, "0");
    this.setState({ currentTitle: `${year}/${month}` });
  };

  handleTouchStart = (e) => {
    this.touchStartX = e.changedTouches[0].clientX;
  };

  handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - this.touchStartX;
    const calendarApi = this.calendarRef.getApi();

    if (diff > 50) {
      calendarApi.prev(); // 오른쪽 스와이프 → 이전 달
    } else if (diff < -50) {
      calendarApi.next(); // 왼쪽 스와이프 → 다음 달
    }
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        <style>
          {`
            /* 전체 달력 컨테이너 */
            .fc {
              width: 100% !important;
              height: 100% !important;
              max-width: 100% !important;
              overflow-x: hidden !important;
              box-sizing: border-box;
            }

            /* 달력 그리드 및 테이블 */
            .fc-view-harness,
            .fc-scrollgrid,
            .fc-scrollgrid-sync-table,
            .fc-col-header,
            .fc-daygrid-body {
              width: 100% !important;
              table-layout: fixed !important;
              margin: 0 !important;
              padding: 0 !important;
              border-spacing: 0 !important;
              border-collapse: collapse !important;
            }

            /* 좌우 여백 제거 */
            .fc-scrollgrid {
              border-left: none !important;
              border-right: none !important;
            }

            .fc-theme-standard td,
            .fc-theme-standard th {
              padding: 0 !important;
              margin: 0 !important;
              border-left: none !important;
              border-right: none !important;
            }

            /* 요일 헤더 (일~토) */
            .fc-col-header-cell-cushion {
              font-size: 10.8px !important;  /* 글씨 크기 줄임 */
              font-weight: 500 !important;
              padding: 2px 0 !important;   /* 세로 여백 줄임 */
            }

            /* 날짜 숫자 */
            .fc-daygrid-day-number {
              font-size: 11px;
            }

            /* 상단 툴바 */
            .fc-header-toolbar {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              padding: 16px 12px !important;
              margin-bottom: 2px !important;
            }

            /* 타이틀 스타일 */
            .fc-toolbar-title {
              font-size: 18px !important;
              font-weight: 600 !important;
              color: #444 !important;
              padding-left: 12px;
            }

            /* 오늘 버튼 */
            .fc-today-button {
              background: #fff !important;
              border: 1px solid #e6e6e6 !important;
              border-radius: 6px !important;
              font-size: 10px !important;
              padding: 4px 10px !important;
              color: #333 !important;
              cursor: pointer;
            }

            /* 타이틀과 요일 헤더 사이 간격 줄이기 */
.fc-toolbar {
  margin-bottom: 0 !important; /* 기본 16px → 4px */F
}

.fc-header-toolbar {
  padding-top: 3px !important;  /* 툴바 하단 패딩 제거 */
}

/* 요일(일 월 화 …) 글씨를 칸 안에서 위아래 중앙 정렬 */
.fc-col-header-cell-cushion {
  display: flex !important;
  align-items: center !important;  /* 세로 중앙 */
  justify-content: center !important; /* 가로 중앙 */
  height: 100% !important;         /* 칸 전체 기준 */
  padding: 0 !important;           /* 불필요한 패딩 제거 */
  line-height: 2.1 !important;     /* 자연스러운 줄 높이 */
}


          `}
        </style>

        {/* 달력 영역 (2/3) */}
        <div style={{ flex: 2, minHeight: 0 }}>
          <FullCalendar
            ref={(el) => (this.calendarRef = el)}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locale="ko"
            headerToolbar={{
              left: "title",
              center: "",
              right: "today",
            }}
            buttonText={{
              today: "오늘",
            }}
            datesSet={this.handleDatesSet}
            titleFormat={() => this.state.currentTitle}
            dayHeaderFormat={{ weekday: "short" }}
            dayCellContent={(arg) => arg.date.getDate()}
            height="100%"
            contentHeight="100%"

            
          />
        </div>

        {/* 이벤트 리스트 영역 (1/3) */}
        <div
          style={{
            flex: 1,
            background: "#ffffff",
            overflowY: "auto",
            padding: "8px",
          }}
        >
          
        </div>
      </div>
    );
  }
}

export default CalendarPage;
