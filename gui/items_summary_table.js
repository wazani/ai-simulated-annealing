function generateScrollableTableHTML(items) {
  const rowsHTML = items
    .map(
      (item) => `
        <tr class="">
            <td class="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900 w-1/3">${
              item.label
            }</td>
            <td class="px-2 py-2 whitespace-nowrap text-xs text-gray-500 w-1/3">${item.weight.toFixed(
              0
            )}</td>
            <td class="px-2 py-2 whitespace-nowrap text-xs text-gray-500 w-1/3">${item.value.toFixed(
              0
            )}</td>
        </tr>
    `
    )
    .join("");

  const tableHTML = `
        <div class="pt-2">
            <div class="rounded shadow overflow-hidden border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                    
                    <thead class="bg-gray-50 sticky top-0">
                        <tr>
                            <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Label
                            </th>
                            <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Weight (kg)
                            </th>
                            <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value ($)
                            </th>
                        </tr>
                    </thead>
                    
                    <tbody class="bg-white divide-y divide-gray-200 max-h-40 overflow-y-auto">
                        ${rowsHTML}
                    </tbody>
                </table>
            </div>
        </div>
    `;

  return tableHTML;
}
