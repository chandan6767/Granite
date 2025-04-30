# frozen_string_literal: true

class Tasks::ReportsController < ApplicationController
  def create
    ReportsJob.perform_async(current_user.id)
  end

  def download
    unless @current_user.report.attached?
      render_error(t("not_found", entity: "report"), :not_found) and return
    end

    send_data @current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def pdf_file_name
      "granite_task_report_#{current_user.id}_#{Time.current.strftime('%Y%m%d_%H%M%S')}.pdf"
    end
end
