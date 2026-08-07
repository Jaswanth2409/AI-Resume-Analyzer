import api from "../services/api";

function DownloadReport({ resumeId }) {

    const downloadReport = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                `/download-report/${resumeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "AI_Resume_Report.pdf"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        } catch (error) {

            console.log(error);

            alert("Unable to download report.");

        }

    };

    return (

        <button
            onClick={downloadReport}
           className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/30"
        >
            📄 Download AI Report
        </button>

    );

}

export default DownloadReport;